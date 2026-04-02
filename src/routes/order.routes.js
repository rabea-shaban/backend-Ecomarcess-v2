const router = require("express").Router();
const { createOrder, getMyOrders, cancelOrder } = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, createOrder);
router.get("/", auth, getMyOrders);
router.patch("/:id/cancel", auth, cancelOrder);

module.exports = router;
