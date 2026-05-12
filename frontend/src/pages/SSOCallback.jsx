import React from 'react';
import { AuthenticateWithRedirectCallback } from '@clerk/react';

const SSOCallback = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900">
            <AuthenticateWithRedirectCallback
                signInForceRedirectUrl="/templates"
                signUpForceRedirectUrl="/templates"
                afterSignInUrl="/templates"
                afterSignUpUrl="/templates"
            />
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-white mb-2">Signing you in...</h2>
                <p className="text-blue-200">Just a moment...</p>
            </div>
        </div>
    );
};

export default SSOCallback;
