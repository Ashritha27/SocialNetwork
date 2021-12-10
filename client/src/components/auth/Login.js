import React, { Fragment ,useState} from 'react';
import axios from 'axios';
import {Link ,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
const Login = ( { login ,isAuthenticated}) => {
    
    const [formData ,setFormData] = useState({
        
        email:'',
        password:''
       
    });

    const {email,password} = formData;

    const onChange = (e) => 
    setFormData({...formData , [e.target.name] : e.target.value} , []);

    const onSubmit = (e) => {
        e.preventDefault();
        login(email,password);
    }

    //redirect of logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign in your Account</p>
            <form className="form" onSubmit={onSubmit}>
               
               
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" 
                value={email}
                onChange={onChange}
                required />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={onChange}
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Dont have an account? <Link to="/register">Sign up</Link>
            </p>
        </Fragment>
    );
};


login.PropTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => (
    {
        isAuthenticated : state.auth.isAuthenticated
    }
);

export default connect(mapStateToProps , {login}) (Login)