import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {createPostComment, fetchComments, removeComemnt, hideComment, unhideComment} from "../../store/commentsActionCreators/commentsActionCreators"
import {fetchCurrentPost, updatePost} from "../../store/postsActionCreators/postsActionCreators";
import './blog.css'
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Alert from "../Alert/Alert";


class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.titleText = React.createRef();
        this.titleInput = React.createRef();
        this.contentText = React.createRef();
        this.contentInput = React.createRef();
        this.updateForm = React.createRef();
        this.changeBtn = React.createRef();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchCurrentPost(id);
        this.props.fetchComments(id);
    }
    getDate = dateStr => {
        const date = new Date(dateStr);
        return `
            ${date.getDay() > 9 ? date.getDay() : "0" + date.getDay()}/${date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth()}/${date.getFullYear()}
        `
    }
    onPublish = event => {
        event.preventDefault();
        const id = this.props.match.params.id;
        console.log(this.textarea.current.value)
        this.props.createPostComment(id, {content: this.textarea.current.value});
        this.textarea.current.value = "";
        this.textarea.current.blur()
    }

    onChangeBtnClick = () => {
        this.contentText.current.style.display = "none";
        this.titleText.current.style.display = "none";
        this.updateForm.current.style.display = "flex";
        this.changeBtn.current.disabled = true;
        this.titleInput.current.value = this.titleText.current.textContent;
        this.contentInput.current.value = this.contentText.current.textContent;
    }
    onChangeFormSubmit = event => {
        event.preventDefault();
        const id = this.props.match.params.id;
        const postBody = {title: this.titleInput.current.value, content: this.contentInput.current.value};
        this.updateForm.current.style.display = "none";
        this.contentText.current.style.display = "block";
        this.titleText.current.style.display = "block";
        this.changeBtn.current.disabled = false;
        this.props.updatePost(id, postBody);
    }
    onHide = id => {
        const [comment] = this.props.postComments.filter(comment => comment.id === id);
        this.props.hideComment(id, comment, this.props.match.params.id);
    }
    onShow = id => {
        const [comment] = this.props.hiddenComments[`${this.props.match.params.id}`].filter(comment => comment.id === id);
        this.props.unhideComment(id, comment, this.props.match.params.id);
    }
    onRemove = id => {
        this.props.removeComemnt(id);
    }

    render() {
        const {currentPost} = this.props;
        if(!currentPost ) {
            return <div className="loader-wrapper"><Loader/></div>
        }
        return (
            <>
                <Header />
                {this.props.alert && <Alert message={this.props.alert}/>}
                <div className="container">
                    <div className="blog-wrapper">
                        <span className="blog-date date">{this.getDate(currentPost.createdAt)}</span>

                        <h1 ref={this.titleText} className="blog-title title">{currentPost.title}</h1>
                        <p ref={this.contentText} className="blog-text text">{currentPost.content}</p>

                        <form
                            ref={this.updateForm}
                            onSubmit={this.onChangeFormSubmit}
                            className="blog-change-form form"
                            style={{display: "none"}}
                        >
                            <input
                                type="text"
                                className="blog-change-input blog-input input"
                                ref={this.titleInput}
                            />
                            <textarea
                                ref={this.contentInput}
                                name="content"
                                cols="40" rows="10"
                                className="blog-change-input blog-input input"
                            />
                            <button type="submit" className="blog-change-submit blog-button button">Update post</button>
                        </form>

                        <p className="blog-author text">Author: {currentPost.author.firstName} {currentPost.author.lastName}</p>
                        {this.props.isLogged ? (
                            <button
                                ref={this.changeBtn}
                                onClick={this.onChangeBtnClick}
                                type="button"
                                className="button button-secondary blog-change-btn"
                            >
                                Change post
                            </button>
                        ): null}
                        <div className="blog-comments">
                            <h2 className="blog-comments-title">{this.props.postComments.length} responses</h2>
                            <h3 className="blog-comments-subtitle text">Publish your comment</h3>
                            <form onSubmit={this.onPublish} className="blog-comments-form form">
                                <textarea ref={this.textarea} name="comment"  cols="30" rows="5" className="blog-input input" placeholder="Type the text"/>
                                <button type="submit" className="blog-button button">Publish</button>
                            </form>
                            <ul className="blog-comments-list">
                                {this.props.postComments.map((comment, index) => (
                                    <li key={comment.id} className="blog-comment">
                                        {this.props.isLogged ? (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn-hide"
                                                    onClick={() => this.onHide(comment.id)}
                                                >
                                                    Hide
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-remove btn-hide"
                                                    onClick={() => this.onRemove(comment.id)}
                                                >
                                                    Remove
                                                </button>
                                            </>
                                        ) : null}
                                        <span className="blog-num">#{index + 1}</span>
                                        <p className="blog-comment-text text">{comment.content}</p>
                                    </li>
                                ))}
                            </ul>
                            {this.props.isLogged ? (
                                <>
                                    <h3 className="blog-hidden-comments-tittle blog-comments-subtitle text">Hidden comments</h3>
                                    <ul className="blog-comments-list">
                                        {this.props.hiddenComments[`${this.props.match.params.id}`] ?
                                            this.props.hiddenComments[`${this.props.match.params.id}`].map((comment, index) => (
                                                <li key={comment.id} className="blog-comment">
                                                    <button
                                                        type="button"
                                                        className="btn-hide"
                                                        onClick={() => this.onShow(comment.id)}
                                                    >
                                                        Show
                                                    </button>
                                                    <span className="blog-num">#{index + 1}</span>
                                                    <p className="blog-comment-hidden blog-comment-text text">{comment.content}</p>
                                                </li>
                                            )) : null}
                                    </ul>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => ({
    postComments: state.commentsState.postComments,
    hiddenComments: state.commentsState.hiddenComments,
    currentPost: state.postsState.currentPost,
    postIsUpdated: state.postsState.postIsUpdated,
    isLogged: state.userState.isLogged,
    alert: state.postsState.alert
});
const mapDispatchToProps = dispatch => ({
    fetchComments: id => dispatch(fetchComments(id)),
    createPostComment: (id, content) => dispatch(createPostComment(id, content)),
    removeComemnt: id => dispatch(removeComemnt(id)),
    hideComment: (id, comment, postId) => dispatch(hideComment(id, comment, postId)),
    unhideComment: (id, comment, postId) => dispatch(unhideComment(id, comment, postId)),
    fetchCurrentPost: id => dispatch(fetchCurrentPost(id)),
    updatePost: (id, postBody) => dispatch(updatePost(id, postBody)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Blog))