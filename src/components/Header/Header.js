import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {filterPosts} from "../../store/postsActionCreators/postsActionCreators";
import {logoutUser} from "../../store/userActionCreators/userActionCreators";
import "./Header.css";
import search from "./search.svg";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.hamburger = React.createRef();
        this.contentBlock = React.createRef();
        this.closeBtn = React.createRef();
        this.searchInput = React.createRef();
        this.searchBtn = React.createRef();
    }
    onHamburgerClick = () => {
        this.contentBlock.current.classList.toggle('header-content-active')
        document.body.style.overflow = 'hidden';
    }
    onCloseClick = () => {
        this.contentBlock.current.classList.remove('header-content-active')
        document.body.style.overflow = '';
    }
    onSearchBtnClick = () => {
        this.searchBtn.current.classList.toggle('header-search-active')
        this.searchInput.current.classList.toggle('header-input-active')
        this.hamburger.current.classList.toggle('header-hamburger-hide')
        this.searchInput.current.focus()
    }
    closeMenu = () => {
        this.contentBlock.current.classList.remove('header-content-active');
        document.body.style.overflow = '';
    }
    onLogoutHandle = () => {
        console.log("Logout");
        this.closeMenu()
        localStorage.removeItem("token");
        this.props.logoutUser();
    }
    onSearchChange = event => {
        const value = event.target.value;
        this.props.filterPosts(value);
    }

    render() {
        return (
            <header className="header">
                <button
                    ref={this.hamburger}
                    onClick={this.onHamburgerClick}
                    type="button"
                    className="header-hamburger"
                >
                    <span/>
                </button>
                <div ref={this.contentBlock} className="header-content">
                    <button
                        ref={this.closeBtn}
                        onClick={this.onCloseClick}
                        type="button"
                        className="header-close"
                    />
                        {this.props.isLogged  ? (
                            <button
                                className="button button-secondary header-btn"
                                type="button"
                                onClick={this.onLogoutHandle}
                            >
                                Log out
                            </button>
                        ) : (
                            <Link
                                className="button button-secondary header-btn"
                                to="/login"
                                onClick={this.closeMenu}
                            >
                                Log in
                            </Link>
                        )}
                    <nav className="header-nav">
                        <ul className="header-nav-list">
                            <li className="header-nav-item">
                                <Link onClick={this.closeMenu} to="/">Blog</Link>
                            </li>
                            <li className="header-nav-item">
                                <Link onClick={this.closeMenu} to="/create-post">Create post</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {this.props.match.params.id ? null : (
                    <>
                        <input
                            className="input header-input"
                            ref={this.searchInput}
                            onChange={this.onSearchChange}
                            type="text"
                            placeholder="Search"
                        />
                        <button
                            className="header-search"
                            ref={this.searchBtn}
                            onClick={this.onSearchBtnClick}
                            type="button"
                        >
                            <img src={search} alt="search"/>
                        </button>
                    </>
                )}
            </header>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.userState.currentUser,
    isLogged: state.userState.isLogged
});
const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    filterPosts: value => dispatch(filterPosts(value))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
