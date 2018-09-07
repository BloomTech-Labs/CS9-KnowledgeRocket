require('dotenv').config();
const router = require('express').Router();
const User = require('../user/User');
const stripe = require('stripe')(`${process.env.Secret_Key}`);
router.route('/:type').post(post);

async function post(req, res) {
    const { type } = req.params;
    const cost = type === 'monthly' ? 999 : 2999;
    try {
        let { status } = await stripe.charges.create({
            amount: cost,
            currency: 'usd',
            description: `Subscription Charge for: ${type}`,
            source: req.body.token,
        });
        //In here modify users to switch between pro and free
        if (status) {
            User.findById(req.body.id).then(currentUser => {
                let expirationDate = Date.parse(currentUser.expiration);
                let year =
                    expirationDate > Date.now()
                        ? expirationDate + 365 * 24 * 60 * 60 * 1000
                        : Date.now() + 365 * 24 * 60 * 60 * 1000;
                let month =
                    expirationDate > Date.now()
                        ? expirationDate + 30 * 24 * 60 * 60 * 1000
                        : Date.now() + 30 * 24 * 60 * 60 * 1000;
                const newExpiration = type === 'monthly' ? month : year;
                User.findByIdAndUpdate(req.body.id, {
                    account: type,
                    expiration: newExpiration,
                })
                    .then(() => {
                        // Find the updated user and return it.
                        User.findById(req.body.id)
                            .then(updatedUser => {
                                res.status(201).json({ status, user: updatedUser });
                            })
                            .catch(err => {
                                res.status(500).json(err);
                            });
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            });
        } else {
            res.status(500).json({ status });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = router;
