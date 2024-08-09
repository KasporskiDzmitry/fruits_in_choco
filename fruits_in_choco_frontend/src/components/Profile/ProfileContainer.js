import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {compose} from "redux";
import {withRouter} from "../hoc/withRouter";
import Preloader from "../common/Preloader/Preloader";
import Admin from "../Admin/Admin";
import {USER_ROLE_ADMIN} from "../utils/constants";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
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
    profile: {}
});

export default compose (
    connect(mapStateToProps, {}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
