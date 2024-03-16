import verifyToken  from '../utility/userVerify.js'
import { PostComent } from '../controllers/comment.controller.js'


import {Router} from 'express'


const router=Router()


router.post('/createcomment',verifyToken,PostComent)

export default router