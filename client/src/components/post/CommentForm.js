import React ,{Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner'
import { addComment } from '../../actions/posts';

const CommentForm = ({ addComment ,postId }) => {

const [text, setText] = useState('');

    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave a comment</h3>
        </div>
        <form class="form my-1" onSubmit={ e=>{
            e.preventDefault();
            addComment( postId,{text})
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={ e=> setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )

}

CommentForm.PropTypes = {
  addComment : PropTypes.func.isRequired

}

const mapStateToProps = state => {
   
}

export default connect( null ,
    {addComment})(CommentForm)