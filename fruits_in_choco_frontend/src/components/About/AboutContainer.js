import React from "react";
import Main from "./About.js";
import {connect} from "react-redux";
import About from "./About.js";

class AboutContainer extends React.Component {
    render() {
        return (
            <About/>
        );
    }
}

const mapStateToProps = state => ({
    // isAuth: state.auth.isAuth,
    // login: state.auth.login
});

export default connect(mapStateToProps, {})(AboutContainer);