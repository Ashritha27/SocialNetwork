import React , {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
const ProfileEducation = ({
    education :{ school ,degree,fieldofstudy , current,to ,from ,description }
}) => {
    return (<div>
        <h3 className="text-dark">{school}</h3>
        <p>
            <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong> Degree: </strong>{degree}
        </p>
        <p>
            <strong> Field of Study: </strong>{fieldofstudy}
        </p>
        <p>
            <strong> description:</strong>{description}
        </p>
    </div>)
}

ProfileEducation.propTypes = {
    educatiom : PropTypes.array.isRequired
}


export default (ProfileEducation);