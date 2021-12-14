import React , {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getProfiles} from '../../actions/profile';
import {useEffect}  from 'react';
import ProfileItem from './ProfileItem';
const Profiles = ({getProfiles , profile : {profiles , loading}}) =>{
    useEffect(() => {
        getProfiles();
    } , []);

    return <Fragment>
        {loading ? <Spinner/> : <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
            <i className="fab fa-connectdevelop"></i>Browse and connect with developers
            </p>
            <div className="profiles">
               { profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile}></ProfileItem>
                    ))
               ) :
               <h4>No profiles found ...</h4>
               }
            </div>
            </Fragment>}
    </Fragment>
};


Profiles.PropTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = statwe => ({
    profile: statwe.profile
});

export default connect(
    mapStateToProps,
    {getProfiles}
)(Profiles);