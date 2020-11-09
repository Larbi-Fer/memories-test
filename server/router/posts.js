const express = require('express')
const { getPosts, createPost, updatePost } = require('../controller/posts.js')

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)

// export default router
module.exports = router