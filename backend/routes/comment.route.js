import verifyToken  from '../utility/userVerify.js'
import { PostComent,getPostComments } from '../controllers/comment.controller.js'


import {Router} from 'express'


const router=Router()


router.post('/createcomment',verifyToken,PostComent)
router.get('/getPostComments/:postId', getPostComments);

export default router