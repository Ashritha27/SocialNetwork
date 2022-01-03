import React , {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


const ProfileExperience = ({
    experience :{ company,location ,title,current,to ,from ,description }
}) => {
    return (<div>
        <h3 className="text-dark">{company}</h3>
        <p>
            <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong> Position: </strong>{title}
        </p>
        <p>
            <strong> description:</strong>{description}
        </p>
    </div>)
}

ProfileExperience.propTypes = {
    experience : PropTypes.array.isRequired
}


export default ProfileExperience;