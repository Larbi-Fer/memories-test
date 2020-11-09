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
    const newPost = new PostMessge(post)
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