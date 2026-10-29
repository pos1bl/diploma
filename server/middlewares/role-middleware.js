import ApiError from "../exceptions/api-error.js";

export const requireRole = (...roles) => (req, res, next) => {
    const userRole = req.user?.role;

    if (!roles.includes(userRole)) {
      return next(ApiError.Forbidden())
    }

    next();
}
