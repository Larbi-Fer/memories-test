const PostMessge = require('../models/postsMessage.js')
const mongoose = require('mongoose')

const getPosts = async(req, res) => {
    try {
        const postMessage = await PostMessge.find()
            // console.log(postMessage);
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
exports.getPosts = getPosts;

// status
// https://www.restapitutorial.com/httpstatuscodes.html

const createPost = (req, res) => {
    const post = req.body
    console.log(post)
    const newPost = new PostMessge({...post, creator: req.userId, createAt: new Date().toISOString() })
    try {
        newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
exports.createPost = createPost;

const updatePost = async(req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updatePost = await PostMessge.findByIdAndUpdate(_id, {...post, _id }, { new: true })
    res.json(updatePost)
}
exports.updatePost = updatePost;

const deletePost = async(req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    await PostMessge.findOneAndRemove(_id)
    res.json({ message: "Post deleted successfully" })
}
exports.deletePost = deletePost;

const likePost = async(req, res) => {
    const { id } = req.params

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const post = await PostMessge.findById(id)

    const index = post.likes.findIndex(id => id === String(req.userId))
    if (index === -1) {
        // like the post
        post.likes.push(req.userId)
    } else {
        // dislike the post
        post.likes = await post.likes.filter(id => id !== String(req.userId))
    }

    const updatePost = await PostMessge.findByIdAndUpdate(id, post, { new: true })

    res.json(updatePost)
}
exports.likePost = likePost;