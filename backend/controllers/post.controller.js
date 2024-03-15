import Post from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, msg: "You are not allowed to create a post" });
    }

    // Check if title and content are provided
    if (!req.body.title || !req.body.content) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide all required fields" });
    }

    // Generate slug
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    // Create new post object
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Return the saved post
    res.status(201).json({
      success: true,
      msg: "post created",
      savedPost,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    console.log(`creating post error ${error}`)
    res.status(500).json({ success: false, msg: "internal server error" });
    // next(error);
  }
};

const getposts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
        success:true,
        msg:'all post',
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.log(`get post failed ${error}`)
    res.status(500).json({success:false,msg:'internal server error'})
  }
};

const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json({success:true,msg:'The post has been deleted'});
    } catch (error) {
        res.status(500).json({success:false,msg:'internal server error'});
        console.log(`delete post failed ${error}`)
    }
  };

  const updatePost=async(req,res)=>{
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return res.status(403).json({success:false,msg:'You are not allowed to update this post'})
      // return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json({success:true,msg:"post updated",updatedPost});
    } catch (error) {
      console.log(`post updated failed ${error}`)
      res.status(500).json({success:false,msg:'internal server error'})
      // next(error);
    }

  }

export { createPost, getposts,deletepost,updatePost };
