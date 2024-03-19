import verifyToken  from '../utility/userVerify.js'
import { PostComent,getPostComments,likeComment } from '../controllers/comment.controller.js'


import {Router} from 'express'


const router=Router()


router.post('/createcomment',verifyToken,PostComent)
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
export default router