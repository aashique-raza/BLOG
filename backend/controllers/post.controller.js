
import Post from "../models/post.model.js";

const createPost=async(req,res)=>{

    try {
        // Check if the user is an admin
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ success: false, msg: 'You are not allowed to create a post' });
        }

        // Check if title and content are provided
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ success: false, msg: 'Please provide all required fields' });
        }

        // Generate slug
        const slug = req.body.title
            .split(' ')
            .join('-')
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, '');

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
            success:true,msg:'post created',savedPost
        });
    } catch (error) {
        // Pass any errors to the error handling middleware
        res.status(500).json({success:false,msg:'internal server error'})
        // next(error);
    }

}


export {createPost}