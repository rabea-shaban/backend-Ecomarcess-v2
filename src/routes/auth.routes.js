const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createRegisterSchema } = require("../validators/users.validation");
const passport = require("passport");
router.post("/register", validate(createRegisterSchema), controller.register);
router.post("/login", controller.login);
router.get("/profile", auth, controller.getProfile);
router.put("/profile", auth, controller.updateProfile);
// 🔵 Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 🔵 Callback
router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, data) => {
      if (err || !data) {
        return res.redirect(`http://localhost:5173/auth/login?error=google_failed`);
      }
      res.redirect(`http://localhost:5173/auth/login-success?token=${data.token}`);
    })(req, res, next);
  }
);
module.exports = router;
