const router = require("express").Router();
const controller = require("../controllers/product.controller");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { createProductSchema } = require("../validators/product.validation");
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  auth,
  role("admin"),
  upload.single("image"),
  validate(createProductSchema),
  controller.create,
);
router.put(
  "/:id",
  auth,
  role("admin"),
  upload.single("image"),
  controller.update,
);

router.delete("/:id", auth, role("admin"), controller.deleteById);

module.exports = router;
