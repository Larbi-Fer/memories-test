const express = require('express')
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controller/posts.js')

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)

// export default router
module.exports = router