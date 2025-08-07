import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
//router.route("/register").post(registerUser) // without helper
//router.route("/register").post(upload.filds,registerUser) //with helper smallForm
//##uplod variable is middleware, using this variable we passed image data into file upload middleware, I am passing type image so that we create 2 aaray with param name and pass file max count
router.route("/register").post(
    upload.fields([
        {
            "name":"avatar",
            "maxCount":1,
        },
        {
            "name":"coverImage",
            "maxCount":1
        }
    ]),
    registerUser)   // with helper

router.route("/login").post(registerUser)


export default router;