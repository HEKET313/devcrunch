let express = require('express');
let router = express.Router();

let subscriptionController = require('../controllers/subscriptionController');

router.get('/', subscriptionController.subscribers);
router.post('/', subscriptionController.subscriber_add);

module.exports = router;
