
import { Router } from "express";
import { testApi,updateUser,deleteUser } from "../controllers/user.controller.js";
import verifyToken from "../utility/userVerify.js";






const router=Router()



router.get('/test',testApi)
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId', verifyToken,deleteUser);


export default router