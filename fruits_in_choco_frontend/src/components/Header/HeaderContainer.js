import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {logout} from "../../redux/auth-reducer";
// import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth,
    // login: state.auth.login
});

export default connect(mapStateToProps, {logout})(HeaderContainer);