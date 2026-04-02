const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/User.Model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
console.log("CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 🔍 دور على user
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email }],
        });

        // 🆕 create لو مش موجود
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
          });
        }

        // 🔗 ربط لو موجود بالإيميل
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        // 🔐 JWT
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
