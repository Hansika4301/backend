const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getStats } = require('../controllers/adminController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/users', authenticate, requireRole('admin'), getUsers);
router.delete('/users/:id', authenticate, requireRole('admin'), deleteUser);
router.get('/stats', authenticate, requireRole('admin'), getStats);

module.exports = router;
