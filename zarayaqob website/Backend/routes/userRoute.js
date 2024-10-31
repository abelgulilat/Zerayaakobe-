import express from "express"
import { userdisplay, userregister, returnusername, check } from "../controller/userReisterControl.js"
import {userlogin} from "../controller/userLoginController.js"
const router = express.Router();


router.post("/register", userregister)
router.post("/login",userlogin)
router.get("/display",userdisplay)
export default router