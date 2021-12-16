import React , {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileByID } from '../../actions/profile';
import PropTypes from 'prop-types';

const Profile = ({
    getProfileByID,
    profile : {profile ,loading},
    auth,
    match
}) => {
    useEffect(() => {
        getProfileByID( match.params.id)
    } , [getProfileByID]);


    return <div>
       porfile
    </div>
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