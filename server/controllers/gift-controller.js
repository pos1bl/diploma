import giftService from "../service/gift-service.js";

class GiftController {

  async fetchGift(req, res, next) {
    try {
      const { code } = req.query;

      const gift = await giftService.getGift(code);

      return res.json(gift);
    } catch (e) {
      next(e);
    }
  }
}

export default new GiftController();
