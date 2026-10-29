import stripe from './stripe-client.js';

class PaymentService {
  async createPaymentLink(payload) {
    return stripe.paymentLinks.create({
      line_items: [{
        price: payload.priceId,
        quantity: 1
      }],
      metadata: payload,
      after_completion: {
        type: 'redirect',
        redirect: { url: `${process.env.CLIENT_URL}/${payload.redirectLink}?session_id={CHECKOUT_SESSION_ID}` }
      }
    });
  }

  async refund(id) {
    return stripe.refunds.create({
      payment_intent: id,
      reason: 'requested_by_customer',
    });
  }
}

export default new PaymentService();
