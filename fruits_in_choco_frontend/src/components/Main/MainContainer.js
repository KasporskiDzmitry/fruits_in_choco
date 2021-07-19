import React from "react";
import Main from "./Main.js";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class MainContainer extends React.Component {
    render() {
        return (
            <Main {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    // isAuth: state.auth.isAuth,
    // login: state.auth.login
});

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(MainContainer)

