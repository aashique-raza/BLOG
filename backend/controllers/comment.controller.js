import Comment from "../models/comment.model.js";

const PostComent = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res
        .status(403)
        .json({
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

    res
      .status(200)
      .json({
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

export { PostComent };
