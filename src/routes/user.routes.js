import { Router } from "express";
import {  loginUser,registerUser ,logOutUser} from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js"
import {verifyJwtToken} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name:"avatar",
      maxCount:1
    },
    {name:"coverImage",
      maxCount:1
    }
  ]),
  
  registerUser)

  router.route("/login").post(loginUser)


  // Secured routes 
  router.route("/logout").post( verifyJwtToken, logOutUser)


export default router