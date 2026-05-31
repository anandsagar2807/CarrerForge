const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Pro plan feature limits
const PRO_FEATURES = {
    maxResumes: 999,
    aiGenerations: 999,
    atsScans: 999,
    premiumTemplates: true,
    prioritySupport: true,
    customBranding: true
};

// Free plan feature limits
const FREE_FEATURES = {
    maxResumes: 3,
    aiGenerations: 5,
    atsScans: 10,
    premiumTemplates: false,
    prioritySupport: false,
    customBranding: false
};

exports.createCheckoutSession = async (userId, userEmail, plan) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: plan === 'pro' ? process.env.STRIPE_PRO_PRICE_ID : null,
            quantity: 1,
        }],
        mode: 'subscription',
        customer_email: userEmail,
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/pricing`,
        metadata: { userId, plan }
    });
    return session;
};

exports.handleWebhook = async (sig, body) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        throw new Error(`Webhook Error: ${err.message}`);
    }

    const User = require('../models/User');

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { userId, plan } = session.metadata;

        const features = plan === 'pro' ? PRO_FEATURES : FREE_FEATURES;

        await User.findByIdAndUpdate(userId, {
            'subscription.plan': plan,
            'subscription.status': 'active',
            'subscription.stripeCustomerId': session.customer,
            'subscription.stripeSubscriptionId': session.subscription,
            'subscription.currentPeriodEnd': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            'subscription.features': features
        });

        console.log(`✅ User ${userId} upgraded to ${plan} plan`);
    }

    if (event.type === 'customer.subscription.updated') {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const user = await User.findOne({ 'subscription.stripeCustomerId': customerId });
        if (user) {
            const plan = subscription.status === 'active' ? 'pro' : 'free';
            const features = plan === 'pro' ? PRO_FEATURES : FREE_FEATURES;

            await User.findByIdAndUpdate(user._id, {
                'subscription.plan': plan,
                'subscription.status': subscription.status === 'active' ? 'active' : 'expired',
                'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000),
                'subscription.features': features
            });

            console.log(`✅ User ${user._id} subscription updated to ${plan}`);
        }
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const user = await User.findOne({ 'subscription.stripeCustomerId': customerId });
        if (user) {
            await User.findByIdAndUpdate(user._id, {
                'subscription.plan': 'free',
                'subscription.status': 'expired',
                'subscription.features': FREE_FEATURES
            });

            console.log(`✅ User ${user._id} subscription cancelled, reverted to free`);
        }
    }

    if (event.type === 'invoice.payment_failed') {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        const user = await User.findOne({ 'subscription.stripeCustomerId': customerId });
        if (user) {
            await User.findByIdAndUpdate(user._id, {
                'subscription.status': 'expired'
            });

            console.log(`⚠️ User ${user._id} payment failed, subscription expired`);
        }
    }
};

exports.getSubscriptionStatus = async (userId) => {
    const User = require('../models/User');
    const user = await User.findById(userId).select('subscription');
    if (!user) throw new Error('User not found');

    return {
        plan: user.subscription.plan,
        status: user.subscription.status,
        features: user.subscription.features,
        currentPeriodEnd: user.subscription.currentPeriodEnd,
        isPro: user.subscription.plan === 'pro' && user.subscription.status === 'active'
    };
};

exports.verifyCheckoutSession = async (sessionId) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
        throw new Error('Session not found');
    }

    const isCompleted = session.payment_status === 'paid';
    const { userId, plan } = session.metadata || {};

    return {
        sessionId: session.id,
        paymentStatus: session.payment_status,
        isCompleted,
        plan: plan || 'unknown',
        customerId: session.customer,
        subscriptionId: session.subscription,
        userId
    };
};
