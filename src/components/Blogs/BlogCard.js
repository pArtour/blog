import React from 'react';
import './BlogCard.css'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {removePost} from "../../store/actionCreators";


class BlogCard extends React.Component {
    getDate = dateStr => {
        const date = new Date(dateStr);
        return `
            ${date.getDay() > 9 ? date.getDay() : "0" + date.getDay()}/${date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth()}/${date.getFullYear()}
        `
    }
    onDelete = id => {
        this.props.removePost(id);
    }

    render() {
        const {post} = this.props;
        return(
            <div className="blogs-card">
                <h2 className="title title-small blogs-title">{post.title}</h2>
                <p className="text blogs-text">{post.content.length > 125 ? post.content.slice(0, 125)+"..." : post.content}</p>
                <p className="text blog-author">Author: {post.author.firstName} {post.author.lastName}</p>
                <div className="blogs-media">
                    <span className="date">{this.getDate(post.createdAt)}</span>
                    <Link to={`/blog/post-${post.id}`} className="blogs-link">Read more</Link>
                    {this.props.isLogged ? <button onClick={() => this.onDelete(post.id)} type="button" className="blog-delete-btn"/> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.isLogged
})
const mapDispatchToProps = dispatch => ({
    removePost: id => dispatch(removePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard)