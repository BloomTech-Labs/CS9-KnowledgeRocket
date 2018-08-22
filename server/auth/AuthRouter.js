//@ts-check
const router = require('express').Router();
const Firebase = require('firebase');
const admin = require('firebase-admin');
const UserModel = require('../user/User');
const { FIREBASE_CONFIG } = require('../config');

// Variable to Initialize Firebase Client App
let init_firebase;
// Variable to Initialize Firebase Admin App
const serviceAccount = {
    projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
    clientEmail: process.env.SERVER_FIRE_CLIENT_EMAIL,
    privateKey: process.env.SERVER_FIRE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
    databaseURL: `${process.env.REACT_APP_FIRE_DB_URL}`,
});
router.route('/').post(post);

// TODO: Implement Token Verification from Firebase
// In the case a user is already authenticated on front end.
function post(req, res) {
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
                        .populate('rockets')
                        .then(foundUser => {
                            // Alternatively Replace Token Here and Send back Updated Token...
                            if (
                                foundUser.expiration <= Date.now() &&
                                foundUser.account !== 'free'
                            ) {
                                // Account has Expired Update account accordingly
                                UserModel.findByIdAndUpdate(foundUser._id, {
                                    account: 'free',
                                })
                                    .populate('rockets')
                                    .then(updatedUser => {
                                        res.status(201).json(updatedUser);
                                    });
                            } else {
                                res.json(foundUser);
                            }
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
                        authProvider: 'email',
                    })
                        // .populate('rockets')
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
        const { uid, token, authType, email } = req.body;
        // If the token checks out continue
        // Else Break and Send Auth Error.
        admin
            .auth()
            .verifyIdToken(token)
            .then(function(decodedToken) {
                const decodedUid = decodedToken.uid;
                if (uid === decodedUid) {
                    UserModel.findOne({ uid })
                        .populate('rockets')
                        .then(foundUser => {
                            if (foundUser === null) {
                                UserModel.create({
                                    email,
                                    uid,
                                    authProvider: authType,
                                })
                                    // .populate('rockets')
                                    .then(createdUser => res.json(createdUser))
                                    .catch(errUser => {
                                        res.json({
                                            errorMessage: errUser.message,
                                        });
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
