import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import AdminContainer from "../Admin/AdminContainer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {getProfile} from "../../redux/thunks/profile_thunks";

class ProfileContainer extends React.Component {
    componentDidMount() {
        // if (!localStorage.getItem("isLoggedIn")) {
        //     this.props.history.push('/login')
        // } else {
        //     this.props.getProfile();
        // }
        this.props.getProfile();
    }


    render() {
        if (!this.props.profile) {
            return <Preloader/>
        } else {
            if (this.props.role === 'ADMIN') {
                return <AdminContainer {...this.props} />;
            } else {
                return <Profile profile={this.props.profile} />
            }
        }
    }
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile,
    role: state.authReducer.role
});

export default compose (
    connect(mapStateToProps, {getProfile}),
    withRouter
)(ProfileContainer)
