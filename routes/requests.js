const express = require('express');
const router = express.Router();
const { createRequest, getMyRequests, getAllRequests } = require('../controllers/requestController');
const { authenticate, requireRole } = require('../middleware/auth');

router.post('/request', authenticate, requireRole('recipient'), createRequest);
router.get('/my-requests', authenticate, requireRole('recipient'), getMyRequests);
router.get('/all-requests', authenticate, requireRole('admin', 'logistics'), getAllRequests);

module.exports = router;
