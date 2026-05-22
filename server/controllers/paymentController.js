const stripeService = require('../services/stripeService');

exports.createCheckoutSession = async (req, res) => {
    try {
        const { plan } = req.body;
        if (!plan || (plan !== 'pro' && plan !== 'enterprise')) {
            return res.status(400).json({ error: 'Invalid plan. Choose "pro" or "enterprise".' });
        }
        const session = await stripeService.createCheckoutSession(req.user.id, req.user.email, plan);
        res.json({ id: session.id, url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        const sig = req.headers['stripe-signature'];
        await stripeService.handleWebhook(sig, req.body);
        res.status(200).send('Webhook handled');
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

exports.getSubscriptionStatus = async (req, res) => {
    try {
        const status = await stripeService.getSubscriptionStatus(req.user.id);
        res.json(status);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyCheckoutSuccess = async (req, res) => {
    try {
        const { session_id } = req.query;
        if (!session_id) {
            return res.status(400).json({ error: 'Missing session_id parameter' });
        }

        const result = await stripeService.verifyCheckoutSession(session_id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
