const express = require('express');
const { addPost, deletePost, editPost, addReact, removeReact } = require('../controller/post');
const router = express.Router();

//protect middleware
const { protect } = require('../middleware/auth');


router.post('/add', protect, addPost);

router.delete('/delete/:id', protect, deletePost);

router.put('/edit/:id', protect, editPost);

router.post('/react/:id', protect, addReact);

router.delete('/react/remove/:id', protect, removeReact);

module.exports = router;