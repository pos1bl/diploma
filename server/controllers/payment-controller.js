import giftService from "../service/gift-service.js";
import paymentService from "../service/payment-service.js";
import sessionService from "../service/session-service.js";
import stripe from '../service/stripe-client.js';

class PaymentController {
  async createPaymentLink(req, res, next) {
    try {
      const { payload, redirectLink } = req.body;
      const { type } = req.params
      const link = await paymentService.createPaymentLink({ ...payload, type, redirectLink, user: req.user.id });

      return res.json({ url: link.url });
    } catch (e) {
      next(e);
    }
  }

  async refund(req, res, next) {
    try {
      const { id } = req.params;
      const message = await sessionService.refund(id);
      return res.json({ message });
    } catch (e) {
      next(e);
    }
  }

  async refundBySpecialist(req, res, next) {
    try {
      const { id } = req.params;
      const message = await sessionService.refundBySpecialist(id);
      return res.json({ message });
    } catch (e) {
      next(e);
    }
  }

  async handleWebhook(req, res, next) {
    const sig = req.headers['stripe-signature'];
    
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

      if (event.type === 'checkout.session.completed' && event.data.object.metadata?.type === "gift") {
        const session = event.data.object;
        const paymentIntentId = session.payment_intent;
        await giftService.sendGift({ ...session.metadata, paymentIntentId })
      }

      if (event.type === 'checkout.session.completed' && event.data.object.metadata?.type === "session") {
        const session = event.data.object;
        const paymentIntentId = session.payment_intent;
        await sessionService.createSession({ paymentIntentId, ...session.metadata })
      }
      
      return res.json({ received: true });
    } catch (e) {
      next(e);
    }
  }
}

export default new PaymentController();
