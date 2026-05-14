const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // check user exist
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // check role allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next(); // ✅ correct
    } catch (error) {
      next(error); // 🔥 IMPORTANT FIX
    }
  };
};
module.exports=roleMiddleware;