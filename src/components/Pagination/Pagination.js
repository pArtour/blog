import React from 'react';
import {connect} from "react-redux";

import './Pagination.css'
import {loadNewPage, loadExactPage} from "../../store/actionCreators";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        }
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


    render() {
        return (
            <>
                <ul className="pagination">
                    <li className="pagination-item pagination-item-prev">
                        <button type="button" className="pagination-arrow pagination-prev" onClick={this.handleMoveLeft}/>
                    </li>
                    {[...Array(this.props.filteredPages)].map((page, index) => (
                        <li className="pagination-item " key={index}>
                            <button
                                type="button"
                                style={this.props.currentPage === index + 1 ? {background: "red"} : null}
                                className={`${this.props.currentPage === index + 1 ? "current" : ""}`}
                                onClick={() => this.goToPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className="pagination-item pagination-item-next">
                        <button type="button" className="pagination-arrow pagination-next" onClick={this.handleMoveRight}/>
                    </li>
                </ul>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadNewPage: page => dispatch(loadNewPage(page)),
    loadExactPage: page => dispatch(loadExactPage(page))
})
const mapStateToProps = state => ({
    posts: state.filteredPosts,
    filteredPages: state.filteredPages,
    currentPage: state.currentPage
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);