const Post = require('../model/post');
const Reaction = require('../model/reactions');

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
        else res.status(401).json({ message: 'Not Authenticated!' });

    }

};

// @desc Edit post
// @route PUT /v1/posts/edit/:id
// @access Private
exports.editPost = async (req, res, next) => {
    const { user } = res.locals;

    const { id } = user;

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let post = await Post.findOne({ _id: req.params.id });

        if (!post) res.status(400).json({ success: false, message: "No Post found!" });
        else {
            if (post.user._id.toString() === id) {
                post = await Post.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true
                });
                res.status(200).json({ success: true, message: 'post updated successfully' });
            }
            else res.status(401).json({ message: 'Not Authenticated!' });
        }
    }
    else res.status(401).json({ message: 'No Post Found!' });


};


// @desc Add reaction to post
// @route PUT /v1/posts/react/:id
// @access Private
exports.addReact = async (req, res, next) => {
    try {
        const { user } = res.locals;

        const { id } = user;

        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            let post = await Post.findById(req.params.id);

            if (!post) res.status(400).json({ success: false, message: "No Post found!" });
            else {
                // if (post.user._id.toString() === id) {
                //req.body = { ...req.body, userId: id, postId: req.params.id }
                const reaction = await Reaction.create({
                    userId: id,
                    postId: req.params.id,
                    reaction: req.body.reaction
                });
                console.log("reaction", reaction)
                post = await Post.findByIdAndUpdate(req.params.id, { $push: { reaction: reaction } }, {
                    new: true,
                    runValidators: true
                });
                res.status(200).json({ success: true, message: 'post updated successfully', post });
            }
            // else res.status(401).json({ message: 'Not Authenticated!' });
        }

        else res.status(401).json({ message: 'No Post Found!' });
    }
    catch (err) {
        console.log('err00000', err)
    }
};

// @desc Remove reaction to post
// @route Delete /v1/posts/react/remove/:id
// @access Private
exports.removeReact = async (req, res, next) => {
    try {
        const { user } = res.locals;

        const { id } = user;

        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            let reaction = await Reaction.findById(req.params.id);

            if (!reaction) res.status(400).json({ success: false, message: "No Reaction found!" });
            else {
                if (reaction.userId.toString() === id) {
                    reaction = await Reaction.findByIdAndDelete(req.params.id);
                    res.status(200).json({ success: true, message: 'reaction removed successfully' });
                }
                else res.status(401).json({ message: 'Not Authenticated!' });
            }
        }
    }
    catch (err) {
        console.log('err00000', err)
    }
};