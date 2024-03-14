import {Router} from 'express'
import verifyToken  from '../utility/userVerify.js'
import { createPost,getposts } from '../controllers/post.controller.js'

const router=Router()


router.post('/create-post',verifyToken,createPost)
router.get('/getposts',getposts)


export default router