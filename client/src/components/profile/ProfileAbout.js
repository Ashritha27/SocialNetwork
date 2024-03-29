import React , {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByID } from '../../actions/profile';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileTop from './ProfileTop';

const ProfileAbout = ({profile : {
   bio,
   skills,
   user: { name} 
}}) => {
    return (
        <div class="profile-about bg-light p-2">
            {bio && (
                <Fragment>
            <h2 class="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
            <p>
                {bio}
            </p>
                </Fragment>
            )}
          
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
           {skills.map((skill , index) => (
               <div key={index} className = "p-1"> <i class="fa fa-check"></i> {skill}</div>
           ))}
          </div>
        </div>
    )

}

ProfileAbout.propTypes = {

    profile:PropTypes.object.isRequired


}


export default ProfileAbout;