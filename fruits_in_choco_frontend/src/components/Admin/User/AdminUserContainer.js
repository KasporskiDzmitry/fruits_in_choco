import React from "react";
import AdminUser from "./AdminUser";
import {connect} from "react-redux";
import {loadUsers} from "../../../redux/thunks/admin_thunks";

class AdminUserContainer extends React.Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        return <AdminUser {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    users: state.adminReducer.users
})

export default connect(mapStateToProps, {loadUsers})(AdminUserContainer);
