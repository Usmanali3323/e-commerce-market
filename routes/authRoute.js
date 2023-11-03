import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateController,
  UpdateProfileController,
  userOrderController,
  getAdminOrderCountroller,
  updateOrderStatusController,
  orderDleteController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router Object
const router = express.Router();

//routing
//Register || Method post

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, testController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.post("/forget-password", updateController);
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.put(`/update-profile`, UpdateProfileController);

//user order
router.get("/dashboard/user-order", requireSignIn, userOrderController);

//Admin All get Order
router.get("/admin/order", requireSignIn, isAdmin, getAdminOrderCountroller);

//Update status of order in admin order
router.put(
  "/admin/order/status/:id",
  requireSignIn,
  isAdmin,
  updateOrderStatusController
);

//delete product
router.delete(
  "/admin/order/delete/:id",
  requireSignIn,
  isAdmin,
  orderDleteController
);
export default router;
