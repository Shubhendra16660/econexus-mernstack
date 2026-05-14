const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  // Name check
  if (!name || name.trim().length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters long",
    });
  }

  // Email check (basic regex)
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  // Password check
  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  next();
};


const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Email check
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  // Password check
  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  next();
};


module.exports = {
  validateRegister,
  validateLogin,
};