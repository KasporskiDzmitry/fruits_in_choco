import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import AdminContainer from "../Admin/AdminContainer";

class ProfileContainer extends React.Component {
    render() {
        if (localStorage.getItem('role') === 'ADMIN') return <AdminContainer {...this.props} />
        return <Profile {...this.props} />
    }
}

const mapStateToProps = state => ({
    // isAuth: state.authReducer.isAuth
});

export default connect(mapStateToProps, {})(ProfileContainer);