const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-checkout-session', protect, paymentController.createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);
router.get('/subscription-status', protect, paymentController.getSubscriptionStatus);
router.get('/verify-success', paymentController.verifyCheckoutSuccess);

module.exports = router;
