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

    const { id } = user;

    const post = await Post.findOne({ _id: req.params.id });

    if (!post) res.status(400).json({ success: false, message: "No Post found!" });
    else {
        if (post.user._id.toString() === id) {
            post.deleteOne();
            res.status(200).json({ success: true, message: 'deleted post successfully' });
        }
        else res.status(501).json({ message: 'No Post Found!' });

    }

};