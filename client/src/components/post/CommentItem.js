import React ,{Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner'
import { addComment } from '../../actions/posts';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/posts';
const CommentItem = ({
    postId,
    comment : { _id ,text,name,avatar,user,date},
    deleteComment
}) => {

    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                <button onClick={ e=> deleteComment(postId, _id)}  type='button' className="btn btn-danger"></button>
            )}
          </div>
        </div>
    )
}

CommentItem.PropTypes = {
    postId :PropTypes.number.isRequired,
    comment:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    deleteComment:PropTypes.func.isRequired


}

const mapStateToProps = state => {
   auth:state.auth
}

export default connect( mapStateToProps ,
    {deleteComment})(CommentItem)