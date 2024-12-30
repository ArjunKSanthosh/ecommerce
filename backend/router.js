import { Router } from "express";
import * as user from "./requesthandler.js"
import Auth from "./middleware/auth.js"

const router=Router();

router.route("/verifyemail").post(user.verifyEmail);
router.route("/signup").post(user.signUp);
router.route("/home").get(Auth,user.home);
router.route("/signin").post(user.signIn);
router.route("/profile").get(Auth,user.profile);
router.route("/edituser").post(Auth,user.edituser);
router.route("/company").get(Auth,user.company);
router.route("/editcompany").post(Auth,user.editCompany);
router.route("/editcategory").post(Auth,user.editCategory);
router.route("/addproduct").post(Auth,user.addProduct);





export default router;