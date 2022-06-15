import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {loadUsers} from "../../../redux/thunks/admin_thunks";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        return <Users {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    users: state.adminReducer.users,
})

export default connect(mapStateToProps, {loadUsers})(UsersContainer);
