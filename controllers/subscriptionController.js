let Subscriber = require('../models/subscriber');
const {check, validationResult} = require('express-validator/check');

exports.subscribers = (req, res) => {
    Subscriber.find({}, (err, subscribers) => {
        let subscribersMap = {};
        subscribers.forEach((subscriber) => {
            subscribersMap[subscriber._id] = subscriber.email;
        });
        res.send(subscribersMap);
    })
};

exports.subscriber_add = [
    check('email').isEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        Subscriber.findOne({'email': req.body.email}).exec((err, subscriber) => {
            if (err) {
                return next(err);
            }

            if (subscriber) {
                res.status(403).json({errors: [
                    {msg: "Already subscribed"}
                ]});
            } else {
                let subscriber = new Subscriber({email: req.body.email});
                subscriber.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({});
                });
            }
        });
    }
];