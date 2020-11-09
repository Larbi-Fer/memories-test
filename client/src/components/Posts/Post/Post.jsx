import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAl'
// import DeletIcon from '@material-ui/icons/Delete'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'

const Post = ({ post }) => {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.madia} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: "#fff"}} size="small" onClick={() => {}}>
                    {/* <MoreHorizIcon fontSize="default" /> */}
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' >{post.tags.map(tag => `${tag}`)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant='body2' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary" onClick={() => {}} >
                    {/* <ThumbUpAltIcon fontSize="small" /> */}
                    Like
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => {}} >
                    {/* <DeletIcon fontSize="small" /> */}
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;