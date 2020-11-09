const PostMessge = require('../models/postsMessage.js')

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
// 26 23