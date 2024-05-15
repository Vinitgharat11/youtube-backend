import { Router } from "express";
import { loggedOutUser, loginUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js"
import { verfiyJWT } from "../middleware/auth.middleware.js";

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
  router.route("/logout").post(verfiyJWT ,loggedOutUser)


export default router