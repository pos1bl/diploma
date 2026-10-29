import ApiError from "../exceptions/api-error.js";
import specialistModel from "../models/specialist-model.js";

export default async function (req, res, next) {
  try {
    const userId = req.user.id;
    const spec = await specialistModel.findOne({ user: userId })
    if (!spec) {
      return next(ApiError.BadRequest("No specialist found"));
    }

    req.specialist = spec;
    next();
  } catch (e) {
    return next(ApiError.UnathorizedError());
  }
}
