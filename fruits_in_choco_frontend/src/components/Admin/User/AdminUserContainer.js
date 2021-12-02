import React from "react";
import AdminUser from "./AdminUser";
import {connect} from "react-redux";
import {loadUsers} from "../../../redux/thunks/admin_thunks";
import {setCurrentPage, setData} from "../../../redux/actions/table_actions";

class AdminUserContainer extends React.Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        return <AdminUser {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    users: state.adminReducer.users,
    data: state.tableReducer.data
})

export default connect(mapStateToProps, {loadUsers, setData, setCurrentPage})(AdminUserContainer);
