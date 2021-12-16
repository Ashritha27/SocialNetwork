import axios from 'axios';
import {setAlert} from './alert'
import { GET_PROFILES } from './types';
import { DELETE_PROFILE } from './types';
import { CLEAR_PROFILE } from './types';
import { UPDATE_PROFILE } from './types';


import {
    GET_PROFILE,
    PROFILE_ERROR
}
from  './types';

export const getCurrentProfile = () => async dispatch => {
    try{

        const res = await axios.get('/api/profiles/me');

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        });
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload : { msg : err.response.statusText , status:err.response.status}
        });
    }
}
//GET ALL PROFILES
export const getProfiles = () =>async dispatch => {
    dispatch({
        type:CLEAR_PROFILE
    });
    try{
        const res = await axios.get('/api/profiles')

        dispatch({
            type:GET_PROFILES,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText , status : err.response.status}
        })
    }
}

export const getProfileByID = userId =>async dispatch => {

    try{
        const res = await axios.get(`/api/profiles/user/${userId}`);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText , status : err.response.status}
        })
    }
}

export const getGithubRepos = username =>async dispatch => {
    try{
        const res = await axios.get(`/api/profiles/github/${username}`);

        dispatch({
            type:GET_REPOS,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText , status : err.response.status}
        })
    }
}

export const createProfile = (formData, history ,edit =false) => async dispatch => {

    try{
        const config  ={
            headers : {
                'Content-type' : 'application/json'
            }
        }

        const res = await axios.post('/api/profiles', formData,config);

        dispatch({
            type:GET_PROFILE,
            payload : res.data
        });


        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

        if(!edit){
            history.push('/dashboard');
        }

    }
    catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status }
        })

    }
}


//Add experience

export const addExperience = (formData , history) => async dispatch => {
    try{
        const config  ={
            headers : {
                'Content-type' : 'application/json'
            }
        }

        const res = await axios.put('/api/profiles/experience', formData,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload : res.data
        });


        dispatch(setAlert('Experience Added' , 'success'));
        history.push('/dashboard');
        

    }
    catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status }
        })

    }
}

//Add education

export const addEducation = (formData , history) => async dispatch => {
    try{
        const config  ={
            headers : {
                'Content-type' : 'application/json'
            }
        }

        const res = await axios.put(`/api/profiles/experience`, formData,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload : res.data
        });


        dispatch(setAlert('Education Added' , 'success'));
        history.push('/dashboard');
    }
    catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status }
        })

    }
}


//Delete experience
export const deleteExperience = id => async dispatch => {
    try{
        const res = await axios.delete(`/api/profiles/experience/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Removed','success'));
    }
    catch(err){
const errors = err.response.data.errors;

        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status }
        })
    }
}

//Delete education
export const deleteEducation = id => async dispatch => {
    try{
        const res = await axios.delete(`/api/profiles/education/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Removed','success'));
    }
    catch(err){
const errors = err.response.data.errors;

        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload : { msg :err.response.statusText , status : err.response.status }
        })
    }
}

//Delete account & profile
export const deleteProfile = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete?')){
        try{
            await axios.delete(`/api/profiles`);
    
            dispatch({
                type:CLEAR_PROFILE
            });
            dispatch({
                type:DELETE_PROFILE
            });
            dispatch(setAlert('Your account has been permanently deleted'));
        }
        catch(err){
             const errors = err.response.data.errors;
    
            if(errors){
                errors.forEach( error => dispatch(setAlert(error.msg , 'danger')));
            }
    
            dispatch({
                type:PROFILE_ERROR,
                payload : { msg :err.response.statusText , status : err.response.status }
            })
        }

    }
    
}
