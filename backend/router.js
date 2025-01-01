import { Router } from "express";
import * as user from "./requesthandler.js"
import Auth from "./middleware/auth.js"

const router=Router();

router.route("/verifyemail").post(user.verifyEmail);
router.route("/signup").post(user.signUp);
router.route("/home").get(Auth,user.home);
router.route("/signin").post(user.signIn);
router.route("/profile").get(Auth,user.profile);
router.route("/edituser").post(Auth,user.editUser);
router.route("/editaddress").post(Auth,user.editAddress);
router.route("/company").get(Auth,user.company);
router.route("/editcompany").post(Auth,user.editCompany);
router.route("/editcategory").post(Auth,user.editCategory);
router.route("/addproduct").post(Auth,user.addProduct);
router.route("/products/:category").get(Auth,user.products);
router.route("/getproduct/:_id").get(Auth,user.getproduct);
router.route("/editproduct/:_id").put(Auth,user.editProduct);
router.route("/product/:_id").get(Auth,user.product);
router.route("/addtocart").post(Auth,user.addToCart);







export default router;