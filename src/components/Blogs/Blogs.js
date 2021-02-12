import React from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from "../../store/postsActionCreators/postsActionCreators";
import './Blogs.css';
import Header from "../Header/Header";
import BlogCard from "./BlogCard";
import Loader from "../Loader/Loader";

class Blogs extends React.Component {

    componentDidMount() {
        console.log(this.props)
        this.props.fetchPosts();
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.filteredPosts) {
            return nextProps.filteredPosts.length !== this.props.filteredPosts.length;
        }
        return true;
    }
    render() {
        if (!this.props.filteredPosts.length) {
            return <div className="loader-wrapper"><Loader/></div>
        }
        return (
            <>
                <Header />
                <div className="container" style={{display: "flex", flexDirection: "column"}}>
                    <div className="blogs-wrapper">
                        {this.props.filteredPosts.map(post => <BlogCard key={post.id} post={post}/>)}
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => ({
    posts: state.postsState.posts,
    filteredPosts: state.postsState.filteredPosts
})

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);