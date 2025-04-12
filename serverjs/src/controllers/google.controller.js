const passport = require("../config/google.config");
const jwt = require("jsonwebtoken");

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Trả về thông tin người dùng và token
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  })(req, res, next);
};
