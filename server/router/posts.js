const express = require('express')
const { getPosts, createPost } = require('../controller/posts.js')

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)

// export default router
module.exports = router