const Post = require('../model/post');

// @desc Add post User
// @route POST /v1/posts/add
// @access Private
exports.addPost = async (req, res, next) => {

    //Add user to req.body
    const { user } = res.locals

    const { title, description } = req.body;

    const post = await Post.create({ ...req.body, user });
    res.status(200).json({ success: true, post });

};

// @desc Delete post
// @route DELETE /v1/posts/delete/:id
// @access Private
exports.deletePost = async (req, res, next) => {
    const { user } = res.locals;

    const { id } = req.body;

    const post = await Post.findOne({ id, user });


    if (!post) res.status(400).json({ success: false, message: "Not Possible" });
    else {
        await post.deleteOne();
        res.status(200).json({ success: true, message: 'deleted post successfully' });
    }


};