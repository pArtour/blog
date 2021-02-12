import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {connect} from "react-redux";
import {getProfileFetch} from "./store/userActionCreators/userActionCreators";


import './App.css';
import Login from "./components/Login/Login";
import CreatPost from "./components/CreatePost/CreatPost";
import Blogs from "./components/Blogs/Blogs";
import Blog from "./components/Blog/Blog";

class App extends React.Component {
  componentDidMount() {
    this.props.getProfileFetch();
  }
  render() {
      return (
          <>
              <Router>
                  <Switch>
                      <Route exact path="/">
                          <Blogs />
                      </Route>
                      <Route path="/blog/post-:id">
                          <Blog/>
                      </Route>
                      <Route path="/create-post">
                          {!this.props.isLogged ? <Redirect to="/login" /> : <CreatPost />}
                      </Route>
                      <Route path="/login">
                          {this.props.isLogged ? <Redirect to="/"/> : <Login/>}
                      </Route>
                  </Switch>
              </Router>
          </>
      );
  }
}

const mapStateToProps = state => ({
    isLogged: state.userState.isLogged
})
const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
