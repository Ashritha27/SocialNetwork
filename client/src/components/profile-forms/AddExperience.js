import React , {Fragment ,useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';

const AddExperience = ( { addExperience ,history }) => {
    const [formData ,setFormData] = useState({
        title : '',
        company : '',
        location : '',
        from : '',
        to:'',
        current: false,
        description : ''
    });

    const [toDateDisables , toggleDisabled] = useState(false);


    const { title ,company,location,from,to,current,description} = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    return (
        <section className="container">
        <h1 className="large text-primary">
         Add An Experience
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit = { e=>{
            e.preventDefault();
            addExperience(formData, history);
        }}>
          <div className="form-group">
            <input type="text" placeholder="* Job Title" value = {title} onChange = {onChange} name="title" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Company" name="company" required value = {company} onChange = {onChange}/>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value = {location} onChange = {onChange} />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"  value = {from} onChange = {onChange} />
          </div>
           <div className="form-group">
            <p><input type="checkbox" name="current" checked = {current} value = {current} onChange = { e=> {
                setFormData( { ...formData , current : !current });
                toggleDisabled(!toDateDisables);
            }} /> {' '}Current Job</p>
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
              placeholder="Job Description" value = {description} onChange = {onChange}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </section>
    )
}

AddExperience.PropTypes = {
    addExperience : PropTypes.func.isRequired
}


export default connect( null ,
    {addExperience})(AddExperience);