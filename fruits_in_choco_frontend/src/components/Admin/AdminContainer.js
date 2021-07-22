import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import Admin from "./Admin";

class AdminContainer extends React.Component {
    render() {
        // if (!this.props.isAuth && localStorage.getItem('role') === 'ADMIN') return <Redirect to='/login'/>
        return <Admin {...this.props} />
    }
}

const mapStateToProps = state => ({
    // isAuth: state.authReducer.isAuth
});

export default connect(mapStateToProps, {})(AdminContainer);