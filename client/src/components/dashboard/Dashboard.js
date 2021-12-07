import React, { useEffect} from 'react';
import Link from 'react-route';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Fragment from 'react';
import DashboardActions from './DashboardActions';

const Dashboard = ({ getCurrentProfile , auth : {user},profile : {profile ,loading}}) => {

    useEffect( () => {
        getCurrentProfile()
    } , []);
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">
            Dashboard
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i>
            Welcome { user && user.name}
        </p>
        {profile !==null ? 
        <Fragment>
            <DashboardActions />
        </Fragment> :
        <Fragment> You have not set up  a profile ,please add some info</Fragment>}
        <Link to ='/create-profile' className="btn btn-primary my-1" >
            Create profile
        </Link>
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile :PropTypes.func.isRequired,
    auth:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps =  state => ({
    auth : state.auth,
    profile : state.profile
});

export default  connect (mapStateToProps, { getCurrentProfile})(Dashboard);