import api from './api';

export const paymentService = {
  async createCheckoutSession(plan) {
    const response = await api.post('/payment/create-checkout-session', { plan });
    return response.data;
  },

  async getSubscriptionStatus() {
    const response = await api.get('/payment/subscription-status');
    return response.data;
  },

  async verifyCheckoutSuccess(sessionId) {
    const response = await api.get(`/payment/verify-success?session_id=${sessionId}`);
    return response.data;
  },
};