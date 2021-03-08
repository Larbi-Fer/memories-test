import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBadse from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux';

import useStyles from './styles'

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if ( post ) setPostData(post)
    }, [post])

    const handlSubmit = e => {
        e.preventDefault()
        if ( currentId === 0 ) {
            dispatch(createPost({...postData, name: user?.result?.name}))
        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        }
        clear()
    }
    const clear = () => {
        setCurrentId(null)
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }
    
    if ( !user?.result?.name ) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align="center">
                    Pleas Sign In to create your own memories and and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField  name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="message" fullWidth multiline rows={4} value={postData.message} onChange={e => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBadse type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size="large" type="submit" fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;