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

router.route('/').post(post);

function post(req, res) {
    console.log('post at AuthRouter', req.body)
    const { email, password, authType } = req.body;
    if (authType === 'signin') {
        // Sign In Handling
        init_firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                // const email = response.user.email;
                response.user.getIdToken().then(token => {
                    // console.log('idToken:', token);
                    UserModel.findOne({ uid })
                        .then(foundUser => {
                            // Alternatively Replace Token Here and Send back Updated Token...
                            res.json(foundUser);
                        })
                        .catch(errUser => {
                            res.json({ errorMessage: errUser.message });
                        });
                    // res.json({ email, uid, token });
                });
                //handleAuthenticated();
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ...
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
                    // console.log('idToken:', token);
                    UserModel.create({
                        email,
                        uid,
                        token,
                    })
                        .then(createdUser => res.json(createdUser))
                        .catch(errUser => {
                            res.json({ errorMessage: errUser.message });
                        });
                    // res.json({ email, uid, token });
                });
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ...
            });
    } else {
        // Handle Oauth Here
        const { uid } = req.body;
        
        // console.log('logged inside else',uid)
        UserModel.findOne({uid})
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
                res.json({ errorMessage: errUser.message });
            });
    }
}

module.exports = router;
