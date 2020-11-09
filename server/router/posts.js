const express = require('express')
const { getPosts, createPost, updatePost, deletePost } = require('../controller/posts.js')

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

// export default router
module.exports = router