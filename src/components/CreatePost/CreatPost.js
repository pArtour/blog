import React from 'react';
import {connect} from "react-redux";
import styles from './CreatePost.module.css'
import Header from "../Header/Header";
import {createPost} from "../../store/actionCreators";

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
                <div className={styles.CreatePostWrapper}>
                    <h1 className={`title ${styles.CreatePostTitle}`}>Publish your post</h1>
                    <form className="form" onSubmit={this.onFormSubmit}>
                        <label className="label form-label" htmlFor="title">Title</label>
                        <input
                            ref={this.title}
                            className="input form-input"
                            type="text"
                            placeholder="Create a title"
                            id="title"
                            name="title"
                        />
                        <label className="label form-label" htmlFor="content">Text</label>
                        <textarea
                            ref={this.textarea}
                            className="input form-input"
                            name="content"
                            id="content"
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
})


export default connect(null, mapDispatchToProps)(CreatPost);