import React from 'react';
import {Link} from 'react-router-dom';
import {userLoginFetch} from "../../store/userActionCreators/userActionCreators";
import {connect} from 'react-redux';
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onInputChange = event => {
        this.setState(prevState => ({...prevState, ...{
            [event.target.name]: event.target.value.trim()
        }}))
    }
    onFormSubmit = event => {
        event.preventDefault();
        this.props.userLoginFetch(this.state);
    }

    render() {
        return (
            <div className="login-wrapper">
                <Link className="login-back" to="/">Back</Link>
                <h1 className="login-title title">Enter your details to log in</h1>
                <form className="form" onSubmit={this.onFormSubmit}>
                    <label className="label form-label"  htmlFor="username">Login</label>
                    <input
                        className="input form-input"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                        type="text"
                        placeholder="Enter your login"
                    />
                    <label className="label form-label" htmlFor="password">Password</label>
                    <input
                        className="input form-input"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        type="password"
                        placeholder="Enter password"
                    />
                    <button disabled={!(this.state.username.length && this.state.password.length)} type="submit" className="button">Log in</button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isLogged: state.userState.isLogged
})
const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);