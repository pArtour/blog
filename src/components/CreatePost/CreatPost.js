import React from 'react';
import {connect} from "react-redux";
import {createPost} from "../../store/postsActionCreators/postsActionCreators";
import './CreatePost.css'
import Header from "../Header/Header";
import Alert from "../Alert/Alert";

class CreatPost extends React.Component {
    constructor(props) {
        super(props);
        this.title = React.createRef();
        this.textarea = React.createRef();
    }
    onFormSubmit = event => {
        event.preventDefault();
        this.props.createPost({title: this.title.current.value, content: this.textarea.current.value});
        this.title.current.value = '';
        this.textarea.current.value = '';
    }
    render() {
        return (
            <>
                <Header />
                {this.props.alert && <Alert message={this.props.alert}/>}
                <div className="create-post-wrapper">
                    <h1 className="title create-post-title">Publish your post</h1>
                    <form className="form" onSubmit={this.onFormSubmit}>
                        <label className="label form-label" htmlFor="title">Title</label>
                        <input
                            className="input form-input"
                            id="title"
                            ref={this.title}
                            type="text"
                            name="title"
                            placeholder="Create a title"
                        />
                        <label className="label form-label" htmlFor="content">Text</label>
                        <textarea
                            className="input form-input"
                            id="content"
                            ref={this.textarea}
                            name="content"
                            cols="30" rows="5"
                            placeholder="Type the text"
                        />
                        <button type="submit" className="button">Publish</button>
                    </form>
                </div>
            </>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    createPost: postBody => dispatch(createPost(postBody))
});
const mapStateToProps = state => ({
    alert: state.postsState.alert
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatPost);