import Comment from "../models/comment.model.js";

const PostComent = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        msg: "You are not allowed to create this comment",
      });
      //   return next(
      //     errorHandler(403, 'You are not allowed to create this comment')
      //   );
    }

    const newComment = new Comment({
      CommentText: content,
      postId,
      userId,
    });
    const commentResult = await newComment.save();

    res.status(200).json({
      success: true,
      msg: "comment created successfully",
      commentResult,
    });
  } catch (error) {
    console.log(`comment create filed ${error}`);
    res.status(500).json({ success: false, msg: "internal server error" });
    // next(error);
  }
};

const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, msg: "all coments", comments });
  } catch (error) {
    res.status(200).json({ success: false, msg: "internal server erroe" });
    //   next(error);
  }
};

 const likeComment = async (req, res, next) => {
  try {
    console.log(req.user)
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({success:false,msg:'Comment not found'})
      // return next(errorHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json({success:true,msg:"liked succesfuly",comment});
  } catch (error) {
    console.log(`liked comment failed ${error}`)
    res.status(500).json({success:false,msg:"internal server error"})
    // next(error);
  }
};

export { PostComent, getPostComments,likeComment };
