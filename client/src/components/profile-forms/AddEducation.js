import React , {Fragment ,useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';
import {Link} from 'react-router-dom'
const AddEducation = ( { addEducation ,history }) => {
    const [formData ,setFormData] = useState({
        degree : '',
        school : '',
        fieldofstudy : '',
        from : '',
        to:'',
        current: false,
        description : ''
    });

    const [toDateDisables , toggleDisabled] = useState(false);


    const { degree ,school,fieldofstudy,from,to,current,description} = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    return (
        <section className="container">
        <h1 className="large text-primary">
         Add your education
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any school you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit = { e=>{
            e.preventDefault();
            addEducation(formData, history);
        }}>
          <div className="form-group">
            <input type="text" placeholder="* Degree" value = {degree} onChange = {onChange} name="title" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* School" name="school" required value = {school} onChange = {onChange}/>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Field of Study" name="fieldofstudy" value = {fieldofstudy} onChange = {onChange} />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"  value = {from} onChange = {onChange} />
          </div>
           <div className="form-group">
            <p><input type="checkbox" name="current" checked = {current} value = {current} onChange = { e=> {
                setFormData( { ...formData , current : !current });
                toggleDisabled(!toDateDisables);
            }} /> {' '}Current</p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value = {to} onChange = {onChange} disabled={toDateDisables ? 'disabled' : '' }/>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description" value = {description} onChange = {onChange}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </section>
    )
}

AddEducation.propTypes = {
    addEducation : PropTypes.func.isRequired
}


export default connect( null ,
    {AddEducation})(AddEducation);