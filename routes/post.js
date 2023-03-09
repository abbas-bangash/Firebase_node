const express = require('express');
const { addPost, deletePost, editPost } = require('../controller/post');
const router = express.Router();

//protect middleware
const { protect } = require('../middleware/auth');


router.post('/add', protect, addPost);

router.delete('/delete/:id', protect, deletePost);

router.put('/edit/:id', protect, editPost);

module.exports = router;