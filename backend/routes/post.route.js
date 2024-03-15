import {Router} from 'express'
import verifyToken  from '../utility/userVerify.js'
import { createPost,getposts,deletepost,updatePost } from '../controllers/post.controller.js'

const router=Router()


router.post('/create-post',verifyToken,createPost)
router.get('/getposts',getposts)
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)
router.put('/updatepost/:postId/:userId',verifyToken,updatePost)


export default router