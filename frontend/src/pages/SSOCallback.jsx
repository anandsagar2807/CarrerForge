import React from 'react';
import { AuthenticateWithRedirectCallback, useClerk } from '@clerk/react';
import { useNavigate } from 'react-router-dom';

const SSOCallback = () => {
    const navigate = useNavigate();
    const { loaded } = useClerk();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-white mb-2">Completing Sign Up...</h2>
                <p className="text-blue-200">Please wait while we finish setting up your account.</p>
                {loaded && (
                    <button
                        onClick={() => navigate('/templates')}
                        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                    >
                        Go to Templates
                    </button>
                )}
            </div>
            <AuthenticateWithRedirectCallback
                signInUrl="/sign-in"
                signUpUrl="/sign-up"
                redirectUrl={window.location.origin + '/templates'}
            />
        </div>
    );
};

export default SSOCallback;
