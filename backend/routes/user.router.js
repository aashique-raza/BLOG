
import { Router } from "express";
import { testApi,updateUser,deleteUser,logout,getUsers,getUser } from "../controllers/user.controller.js";
import verifyToken from "../utility/userVerify.js";






const router=Router()



router.get('/test',testApi)
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId', verifyToken,deleteUser);
router.post('/logout',logout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);


export default router