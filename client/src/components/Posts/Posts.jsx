import React from 'react'
import { useSelector } from 'react-redux';

import Post from './Post/Post'
import useStyles from './styles'

const Posts = () => {
    const Posts = useSelector((state) => state.posts)
    const classes = useStyles()
    console.log(Posts);
    return (

        <div>
            <h1>POSTS</h1>
            <Post />
            <Post />
        </div>
    )
}

export default Posts;