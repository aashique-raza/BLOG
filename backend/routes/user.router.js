
import { Router } from "express";
import { testApi,updateUser } from "../controllers/user.controller.js";
import verifyToken from "../utility/userVerify.js";






const router=Router()



router.get('/test',testApi)
router.put('/update/:userId',verifyToken,updateUser)


export default router