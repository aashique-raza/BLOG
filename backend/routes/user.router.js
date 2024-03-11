
import { Router } from "express";
import { testApi } from "../controllers/user.controller.js";






const router=Router()



router.get('/test',testApi)


export default router