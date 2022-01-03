import React,{Fragment} from 'react';
import {Link} from 'react-router-dom'; 
import { deleteEducation } from '../../actions/profile';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
const Education = ( {education , deleteEducation}) => {
    const educations = education.map(
        exp=> (
            <tr>
                <td key= {exp._id}></td>
                <td>{exp.school}</td>
                <td className="hide-sm">{exp.degree}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment>- {' '}
                    {
                        exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                    }
                </td>
                <td>
                    <button className='btn btn-danger' onClick={ () => deleteEducation(exp._id)}>Delete</button>
                </td>
            </tr>
        )
    );

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect( null ,{ deleteEducation})(Education);