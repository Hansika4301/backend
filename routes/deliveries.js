const express = require('express');
const router = express.Router();
const { getDeliveries, updateDeliveryStatus, getMyDeliveries } = require('../controllers/deliveryController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/deliveries', authenticate, requireRole('logistics', 'admin'), getDeliveries);
router.get('/my-deliveries', authenticate, requireRole('logistics'), getMyDeliveries);
router.put('/delivery-status', authenticate, requireRole('logistics'), updateDeliveryStatus);

module.exports = router;
