import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBadse from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux';

import useStyles from './styles'

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(post, currentId); // 28:41
        if ( post ) setPostData(post)
    }, [post])

    const handlSubmit = e => {
        e.preventDefault()
        if ( currentId ) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData))
        }
        clear()
    }
    const clear = () => {
        setCurrentId(null)
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField  name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={e => setPostData({ ...postData, creator: e.target.value })} />
                <TextField  name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={e => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={e => setPostData({ ...postData, tags: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBadse type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button classNmae={classes.buttonSubmit} variant='contained' color='primary' size="large" type="submit" fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;