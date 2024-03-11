

import { sigunp } from "../controllers/auth.controller.js";
import { Router } from "express";

const router=Router()


router.post('/signup',sigunp)


export default router