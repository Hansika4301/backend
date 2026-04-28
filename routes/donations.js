const express = require('express');
const router = express.Router();
const { donateItem, getMyDonations, getAllDonations } = require('../controllers/donationController');
const { authenticate, requireRole } = require('../middleware/auth');

router.post('/donate-item', authenticate, requireRole('donor'), donateItem);
router.get('/my-donations', authenticate, getMyDonations);
router.get('/all-donations', authenticate, requireRole('admin'), getAllDonations);

module.exports = router;
