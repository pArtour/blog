import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


import './Login.css'
import {userLoginFetch} from "../../store/actionCreators";

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
        console.log(this.state)
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
                        type="text"
                        name="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                        placeholder="Enter your login"
                    />
                    <label className="label form-label" htmlFor="password">Password</label>
                    <input
                        className="input form-input"
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        placeholder="Enter password"
                    />
                    <button disabled={!(this.state.username.length && this.state.password.length)} type="submit" className="button">Log in</button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isLogged: state.isLogged
})
const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);