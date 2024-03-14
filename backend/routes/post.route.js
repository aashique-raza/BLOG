import {Router} from 'express'
import verifyToken  from '../utility/userVerify.js'
import { createPost } from '../controllers/post.controller.js'

const router=Router()


router.post('/create-post',verifyToken,createPost)


export default router