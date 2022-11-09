import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {compose} from "redux";
import {withRouter} from "../hoc/withRouter";
import Preloader from "../common/Preloader/Preloader";
import {getProfile} from "../../redux/thunks/profile_thunks";
import Admin from "../Admin/Admin";
import {USER_ROLE_ADMIN} from "../utils/constants";

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
            if (localStorage.role === USER_ROLE_ADMIN) {
                return <Admin {...this.props}  />;
            } else {
                return <Profile profile={this.props.profile} />
            }
        }
    }
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile
});

export default compose (
    connect(mapStateToProps, {getProfile}),
    withRouter
)(ProfileContainer)
