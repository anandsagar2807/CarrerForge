const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Check if user has reached free plan limits
exports.checkSubscription = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    const { plan, features, status } = req.user.subscription;

    // Pro users have no limits
    if (plan === 'pro' && status === 'active') {
        return next();
    }

    // Free plan limits
    if (req.user.usage.resumesCreated >= features.maxResumes) {
        return res.status(403).json({
            message: 'Free plan limit reached. Please upgrade to Pro for unlimited resumes.',
            limit: 'maxResumes',
            current: req.user.usage.resumesCreated,
            max: features.maxResumes
        });
    }

    if (req.user.usage.aiGenerationsUsed >= features.aiGenerations) {
        return res.status(403).json({
            message: 'Free plan AI generation limit reached. Upgrade to Pro for unlimited AI features.',
            limit: 'aiGenerations',
            current: req.user.usage.aiGenerationsUsed,
            max: features.aiGenerations
        });
    }

    if (req.user.usage.atsScansUsed >= features.atsScans) {
        return res.status(403).json({
            message: 'Free plan ATS scan limit reached. Upgrade to Pro for unlimited scans.',
            limit: 'atsScans',
            current: req.user.usage.atsScansUsed,
            max: features.atsScans
        });
    }

    next();
};

// Require Pro subscription for premium features
exports.requirePro = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    const { plan, status } = req.user.subscription;

    if (plan !== 'pro' || status !== 'active') {
        return res.status(403).json({
            message: 'This feature requires a Pro subscription. Please upgrade to access premium templates and features.',
            isPro: false
        });
    }

    next();
};

// Check if user is Pro (doesn't block, just adds flag)
exports.flagSubscription = (req, res, next) => {
    if (req.user) {
        const { plan, status } = req.user.subscription;
        req.isPro = plan === 'pro' && status === 'active';
    } else {
        req.isPro = false;
    }
    next();
};
