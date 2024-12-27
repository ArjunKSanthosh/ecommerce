import { Router } from "express";
import * as user from "./requesthandler.js"
import Auth from "./middleware/auth.js"

const router=Router();

router.route("/verifyemail").post(user.verifyEmail);
router.route("/signup").post(user.signUp);

export default router;