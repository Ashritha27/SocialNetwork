import axios from 'axios';
import {setAlert} from './alert'
import { DELETE_POST } from './types';
import { GET_POST } from './types';
import { REMOVE_COMMENT } from './types';
import { ADD_COMMENT } from './types';
import { ADD_POST } from './types';
import { DELETE_PROFILE } from './types';
import { UPDATE_POST } from './types';
import { GET_PROFILE } from './types';
import { GET_POSTS,POST_ERROR } from './types';


export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get('/api/posts')

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}


//Add like
export const addLike = id => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/like/${id}`)

        dispatch({
            type:UPDATE_POST,
            payload:{id, likes:res.data}
        });
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}

//remove like
export const removeLike = id => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/unlike/${id}`)

        dispatch({
            type:UPDATE_POST,
            payload:{id, likes:res.data}
        });
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}

//delete post
export const deletePost = id => async dispatch => {
    try{
        await axios.delete(`/api/posts/${id}`)

        dispatch({
            type:DELETE_POST,
            payload:id
        });


        dispatch(setAlert('Post deleted','success'));
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}

export const addPost = formData => async dispatch => {
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    try{
        const res= await axios.post(`/api/posts`,formData,config)

        dispatch({
            type:ADD_POST,
            payload:res.data
        });


        dispatch(setAlert('Post Added','success'));
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}

export const getPost = id => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type:GET_POST,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}

export const addComment = ( postId , formData) => async dispatch => {
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    try{
        const res= await axios.post(`/api/posts/comment/${postId}`,formData,config)

        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        });


        dispatch(setAlert('Comment Added','success'));
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}

export const deleteComment = ( postId , commentId ) => async dispatch => {

    try{
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type:REMOVE_COMMENT,
            payload:res.data
        });


        dispatch(setAlert('Comment Removed','success'));
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status}
        });
    }
}
