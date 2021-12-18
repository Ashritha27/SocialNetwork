import React , {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByID } from '../../actions/profile';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
const Profile = ({
    getProfileByID,
    profile : {profile ,loading},
    auth,
    match
}) => {
    useEffect(() => {
        getProfileByID( match.params.id)
    } , [getProfileByID,match.params.id]);


    return <Fragment>
        {profile === null || loading ? <Spinner></Spinner> : <Fragment>
            <Link to='/profiles'>
                Back to profiles
            </Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && <Link to='/edit-profile'></Link>}
            </Fragment>}
            <div class="profile-grid my-1">
                <ProfileTop profile = {profile} />
                <ProfileAbout profile = {profile} />
                <div className="profile-exp bg-white p-2">
                <h2 class="text-primary">Experience</h2>
                 {profile.experience.length > 0 ? (<Fragment>
                     {profile.experience.map((exp )=> (
                            <ProfileExperience experience={exp} key={experience._id} />
                     ))}
                 </Fragment>) : ( <h4> No experience creds </h4>) }
                </div>

                <div className="profile-edu bg-white p-2">
                <h2 class="text-primary">Education</h2>
                 {profile.education.length > 0 ? (<Fragment>
                     {profile.education.map((edu )=> (
                            <ProfileEducation education={edu} key={education._id} />
                     ))}
                 </Fragment>) : ( <h4> No education creds </h4>) }
                </div>

                { profile.githubusername && (
                    <></>
                )}
            </div>
    </Fragment>
}

Profile.propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired

}
 const mapStateToProps = state => ({
     profile :state.profile,
     auth :state.auth
 })

export default connect( mapStateToProps ,
    {getProfileByID})(Profile);