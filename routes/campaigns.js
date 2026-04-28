const express = require('express');
const router = express.Router();
const { getCampaigns, createCampaign, deleteCampaign } = require('../controllers/campaignController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getCampaigns);
router.post('/', authenticate, requireRole('admin'), createCampaign);
router.delete('/:id', authenticate, requireRole('admin'), deleteCampaign);

module.exports = router;
