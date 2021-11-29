import React from "react";
import AdminUser from "./AdminUser";
import {connect} from "react-redux";

class AdminUserContainer extends React.Component {
    render() {
        return <AdminUser />
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(AdminUserContainer);
