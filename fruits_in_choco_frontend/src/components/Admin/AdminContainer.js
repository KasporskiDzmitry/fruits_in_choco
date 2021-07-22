import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import Admin from "./Admin";

class AdminContainer extends React.Component {
    render() {
        if (!this.props.isLoggedIn) return <Redirect to='/login'/>
        return <Admin {...this.props} />
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.adminReducer.isAdminLoggedIn
});

export default connect(mapStateToProps, {})(AdminContainer);