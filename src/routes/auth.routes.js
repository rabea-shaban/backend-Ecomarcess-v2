const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createRegisterSchema } = require("../validators/users.validation");

router.post("/register", validate(createRegisterSchema), controller.register);
router.post("/login", controller.login);
router.get("/profile", auth, controller.getProfile);
router.put("/profile", auth, controller.updateProfile);

module.exports = router;
