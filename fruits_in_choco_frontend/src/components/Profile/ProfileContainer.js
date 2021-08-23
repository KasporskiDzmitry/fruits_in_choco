import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import AdminContainer from "../Admin/AdminContainer";
import {getProfile} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {
    componentDidMount() {
        if (!localStorage.getItem("isLoggedIn")) {
            this.props.history.push('/login')
        } else {
            this.props.getProfile();
        }
    }


    render() {
        if (localStorage.getItem('role') === 'ADMIN') return <AdminContainer {...this.props} />
        return <Profile {...this.props} />
    }
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile
});

export default compose (
    connect(mapStateToProps, {getProfile}),
    withRouter
)(ProfileContainer)
