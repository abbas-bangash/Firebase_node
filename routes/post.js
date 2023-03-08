const express = require('express');
const { addPost, deletePost } = require('../controller/post');
const router = express.Router();

//protect middleware
const { protect } = require('../middleware/auth');


router.post('/add', protect, addPost);

router.delete('/delete/:id', protect, deletePost);

module.exports = router;