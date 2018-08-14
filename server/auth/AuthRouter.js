const router = require('express').Router();
const Firebase = require('firebase');
const { FIREBASE_CONFIG } = require('../config');
let init_firebase;
const UserModel = require('../user/User');

// Init FB App if none exsists
if (!Firebase.apps.length) {
    init_firebase = Firebase.initializeApp(FIREBASE_CONFIG);
} else {
    init_firebase = Firebase.apps[0];
}

router
    .route('/')
    .post(post)

function post(req, res) {
    const { email, password, authType } = req.body;
    if (authType === 'signin') {
        // Sign In Handling
        init_firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                const email = response.user.email;             
                response.user.getIdToken()
                    .then(token => {
                        // console.log('idToken:', token);
                        res.json({ email, uid, token });
                    })
                //handleAuthenticated();
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ...
            });
    } else {
        // Sign Up Handling
        init_firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                const email = response.user.email;
                response.user.getIdToken()
                    .then(token => {
                        // console.log('idToken:', token);
                        UserModel.create({ email, uid, token }).then(u => console.log(u));
                        res.json({ email, uid, token });
                    })
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ...
            });
    }
}


module.exports = router;