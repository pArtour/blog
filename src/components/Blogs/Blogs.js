import React from 'react';
import { connect } from 'react-redux';

import './Blogs.css';
import '../Pagination/Pagination.css'
import Header from "../Header/Header";
import Pagination from "../Pagination/Pagination";
import {fetchPosts, loadExactPage, loadNewPage} from "../../store/actionCreators";
import BlogCard from "./BlogCard";


import ReactPaginate from 'react-paginate';

class Blogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts,
            currentPosts: this.props.currentPosts,
            totalPages: null,
            currentPage: 0,
            perPage: 2,
            offset: 0
        }
    }
    componentDidMount() {
        this.props.fetchPosts();
        console.log(this.state)
        this.props.loadExactPage(0);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.posts) {
            return nextProps.posts.length !== this.props.posts.length;
        }
        return true;
    }

    handleMoveLeft = () => {
        console.log('click')
        this.props.loadNewPage({page: -1})
    }
    handleMoveRight = () => {
        console.log('click')
        this.props.loadNewPage({page: +1})
    }
    goToPage(page) {
        console.log('click')

        // this.props.loadExactPage({page})
    }
    pageChangeHandler = ({selected}) => {
        // this.props.loadExactPage({page: select})
        console.log(selected);
        this.setState({currentPage: selected, offset: selected * this.state.perPage})
        console.log(this.state)
        // this.props.loadExactPage(selected)
    }
    render() {
        if (!this.props.filteredPosts) {
            return <h1 className="title">Loading...</h1>
        }
        return (
            <>
                <Header />
                <div className="container" style={{display: "flex", flexDirection: "column"}}>
                    <div className="blogs-wrapper">
                        {this.props.posts.map(post => <BlogCard key={post.id} post={post}/>)}
                    </div>
                    {/*<div className="blogs-pagination-wrapper">*/}
                    {/*    <ReactPaginate*/}
                    {/*        previousLabel={'<'}*/}
                    {/*        nextLabel={'>'}*/}
                    {/*        breakLabel={'...'}*/}
                    {/*        breakClassName={'break-me'}*/}
                    {/*        pageCount={this.props.totalPages}*/}
                    {/*        forcePage={0}*/}
                    {/*        marginPagesDisplayed={3}*/}
                    {/*        pageRangeDisplayed={5}*/}
                    {/*        onPageChange={this.pageChangeHandler}*/}
                    {/*        containerClassName={'pagination'}*/}
                    {/*        subContainerClassName={'pages pagination bla'}*/}
                    {/*        activeClassName={'active'}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </>

        );
    }
}
const mapStateToProps = state => ({
    posts: state.posts,
    filteredPosts: state.filteredPosts,
    currentPage: state.currentPage,
    filteredPages: state.filteredPages,
    totalPages: state.totalPages,
    offset: state.offset,
    countPerPage: state.countPerPage
})

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    loadNewPage: payload => dispatch(loadNewPage(payload)),
    loadExactPage: payload => dispatch(loadExactPage(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);