import React , {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
const ProfileTop = ({ profile : {
    status,company,location,website,social,user:{name,avatar}
}}) => {
    return (
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 class="large">{name}</h1>
          <p class="lead">{status} {company  && <span> at {company}</span>}</p>
          <p>{location && <span>at {location}</span>}</p>
          <div class="icons my-1">
              {
                  website && (<a href={website} target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-globe fa-2x"></i>
                </a>)
              }
            {
                social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-twitter fa-2x"></i>
                  </a>

                )
            }
           {
                social && social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-facebook fa-2x"></i>
                  </a>

                )
            }
           {
                social && social.linkedin && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin fa-2x"></i>
                  </a>

                )
            }
            {
                social && social.youtube && (
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin fa-2x"></i>
                  </a>

                )
            }
           {
                social && social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-instagram fa-2x"></i>
                  </a>

                )
            }
          </div>
          </div>

    )
}

ProfileTop.propTypes = {
   profile:PropTypes.object.isRequired

}
 const mapStateToProps = state => ({
     profile :state.profile,
     auth :state.auth
 })

export default (ProfileTop);