import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Crown, Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { paymentService } from '../services/paymentService';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { refreshUser, isPro } = useAuth();

    const [status, setStatus] = useState('verifying'); // verifying | success | error
    const [sessionData, setSessionData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
            setStatus('error');
            setErrorMessage('No session ID found. Please try again or contact support.');
            return;
        }

        const verifyPayment = async () => {
            try {
                // Verify the checkout session with the backend
                const result = await paymentService.verifyCheckoutSuccess(sessionId);

                if (result.isCompleted) {
                    setSessionData(result);
                    // Refresh user data to get updated subscription status
                    await refreshUser();
                    setStatus('success');
                } else {
                    setStatus('error');
                    setErrorMessage(`Payment status: ${result.paymentStatus}. Please try again or contact support.`);
                }
            } catch (err) {
                console.error('Payment verification failed:', err);
                // Even if verification fails, try refreshing user — webhook may have already processed
                try {
                    await refreshUser();
                    if (isPro()) {
                        setStatus('success');
                        return;
                    }
                } catch (refreshErr) {
                    console.error('User refresh also failed:', refreshErr);
                }
                setStatus('error');
                setErrorMessage(err.response?.data?.error || err.message || 'Payment verification failed. Please contact support.');
            }
        };

        verifyPayment();
    }, [searchParams]);

    // Success view
    if (status === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 max-w-lg w-full mx-6"
                >
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 border border-emerald-200/50 shadow-2xl text-center">
                        {/* Success icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                        >
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Crown badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 rounded-full mb-4 shadow-sm"
                        >
                            <Crown className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-bold text-amber-700">PRO MEMBER</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-3xl font-bold text-slate-900 mb-3"
                        >
                            Welcome to Pro! 🎉
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-slate-600 mb-8 leading-relaxed"
                        >
                            Your subscription is now active. You have unlocked all premium features including
                            premium templates, watermark-free PDFs, and unlimited AI generations.
                        </motion.p>

                        {/* Feature highlights */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-3 mb-8"
                        >
                            {[
                                { icon: <Crown className="w-5 h-5" />, label: 'Premium Templates' },
                                { icon: <Sparkles className="w-5 h-5" />, label: 'No Watermark' },
                                { icon: <ArrowRight className="w-5 h-5 rotate-90" />, label: 'Unlimited AI' },
                            ].map((feature, i) => (
                                <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
                                    <div className="text-emerald-600 mb-1">{feature.icon}</div>
                                    <span className="text-xs font-medium text-slate-700">{feature.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="space-y-3"
                        >
                            <button
                                onClick={() => navigate('/templates')}
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <Sparkles className="w-5 h-5" />
                                Start Building Your Resume
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full px-6 py-3 text-slate-600 font-medium rounded-xl hover:text-slate-900 hover:bg-slate-50 transition-all duration-300"
                            >
                                Go to Home
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Error view
    if (status === 'error') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 max-w-lg w-full mx-6"
                >
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 border border-red-200/50 shadow-2xl text-center">
                        {/* Error icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                        >
                            <AlertCircle className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl font-bold text-slate-900 mb-3">
                            Payment Verification Issue
                        </h1>

                        <p className="text-slate-600 mb-4 leading-relaxed">
                            We couldn't verify your payment. This might be a temporary issue — your payment may still be processing.
                        </p>

                        {errorMessage && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                <p className="text-sm text-red-700">{errorMessage}</p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/pricing')}
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                            >
                                Back to Pricing
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full px-6 py-3 text-slate-600 font-medium rounded-xl hover:text-slate-900 hover:bg-slate-50 transition-all duration-300"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Verifying / loading view
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
            >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 border border-blue-200/50 shadow-2xl max-w-md mx-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 mx-auto mb-6"
                    >
                        <Loader2 className="w-16 h-16 text-blue-600" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                        Verifying Your Payment...
                    </h2>

                    <p className="text-slate-600 leading-relaxed">
                        We're confirming your subscription with Stripe. This usually takes just a few seconds.
                    </p>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccessPage;