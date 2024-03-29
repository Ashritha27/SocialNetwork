import React ,{Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner'
import {getPost} from '../../actions/posts';
import { getPosts } from '../../actions/posts';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import {Link} from 'react-router-dom'
const Post = ({
    getPost,
    post : { post,loading} ,
    match
}) => {


    useEffect(() => {
        getPost(match.params.id)
    } , [getPost])

    return loading || post === null ? <Spinner /> : 
    <Fragment>
        <Link to='/posts' className='btn'>Back to posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        
    </Fragment>
}


Post.propTypes = {
    getPost :PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post:state.post
})

export default Post