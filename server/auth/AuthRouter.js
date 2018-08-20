const router = require('express').Router();
const Firebase = require('firebase');
const admin = require('firebase-admin');
const UserModel = require('../user/User');
const { FIREBASE_CONFIG } = require('../config');

// Variable to Initialize Firebase Client App
let init_firebase;
// Variable to Initialize Firebase Admin App
const serviceAccount = {
    type: 'service_account',
    project_id: process.env.REACT_APP_FIRE_PROJECT_ID,
    private_key_id: process.env.SERVER_FIRE_PRIVATE_KEY_ID,
    private_key: process.env.SERVER_FIRE_PRIVATE_KEY,
    client_email: process.env.SERVER_FIRE_CLIENT_EMAIL,
    client_id: process.env.SERVER_FIRE_CLIENT_ID,
    auth_uri: process.env.SERVER_FIRE_AUTH_UIR,
    token_uri: process.env.SERVER_FIRE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.SERVER_FIRE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.SERVER_FIRE_CLIENT_CERT_URL,
};

// Init FireBase App if none exists
if (!Firebase.apps.length) {
    init_firebase = Firebase.initializeApp(FIREBASE_CONFIG);
} else {
    init_firebase = Firebase.apps[0];
}

// Initialize Firebase Admin App
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.REACT_APP_FIRE_DB_URL,
});
router.route('/').post(post);

// TODO: Implement Token Verification from Firebase
// In the case a user is already authenticated on front end.

function post(req, res) {
    console.log('post at AuthRouter', req.body);
    const { email, password, authType } = req.body;
    if (authType === 'signin') {
        // Sign In Handling
        init_firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                response.user.getIdToken().then(token => {
                    UserModel.findOne({ uid })
                        .then(foundUser => {
                            // Alternatively Replace Token Here and Send back Updated Token...
                            res.json(foundUser);
                        })
                        .catch(errUser => {
                            res.json({ errorMessage: errUser.message });
                        });
                });
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                res.status(406).json({ errorMessage, errorCode });
            });
    } else if (authType === 'signup') {
        // Sign Up Handling
        init_firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                const email = response.user.email;
                response.user.getIdToken().then(token => {
                    UserModel.create({
                        email,
                        uid,
                        token,
                    })
                        .then(createdUser => res.json(createdUser))
                        .catch(errUser => {
                            res.json({ errorMessage: errUser.message });
                        });
                });
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                res.status(406).json({ errorMessage, errorCode });
            });
    } else {
        // Handle Oauth Here
        const { uid, token } = req.body;
        // If the token checks out continue
        // Else Break and Send Auth Error.
        admin
            .auth()
            .verifyIdToken(token)
            .then(function(decodedToken) {
                const decodedUid = decodedToken.uid;
                if (uid === decodedUid) {
                    UserModel.findOne({ uid })
                        .then(foundUser => {
                            if (foundUser === null) {
                                UserModel.create({
                                    email: req.body.email,
                                    uid,
                                    token: req.body.token,
                                })
                                    .then(createdUser => res.json(createdUser))
                                    .catch(errUser => {
                                        res.json({ errorMessage: errUser.message });
                                    });
                            } else {
                                res.json(foundUser);
                            }
                        })
                        .catch(errUser => {
                            res.status(400).json({ errorMessage: errUser.message });
                        });
                } else {
                    res.status(400).json({
                        errorMessage:
                            'unable to authenticate user with that token, please try again.',
                    });
                }
            })
            .catch(function(error) {
                res.status(400).json({
                    errorMessage: 'unable to authenticate user with that token, please try again.',
                });
            });
    }
}

module.exports = router;
