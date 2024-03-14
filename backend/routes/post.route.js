import {Router} from 'express'
import verifyToken  from '../utility/userVerify.js'
import { createPost,getposts,deletepost } from '../controllers/post.controller.js'

const router=Router()


router.post('/create-post',verifyToken,createPost)
router.get('/getposts',getposts)
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)


export default router