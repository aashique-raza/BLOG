import verifyToken  from '../utility/userVerify.js'
import { PostComent,getPostComments,likeComment,editComment,deleteComment,getcomments } from '../controllers/comment.controller.js'


import {Router} from 'express'


const router=Router()


router.post('/createcomment',verifyToken,PostComent)
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router