import React from "react";
import {connect} from "react-redux";
import AdminCategory from "./AdminCategory";

class AdminCategoryContainer extends React.Component {
    render() {
        return <AdminCategory {...this.props}/>
    }
}

const mapStateToProps = state => ({
    categories: state.mainPage.categories,
});

export default connect(mapStateToProps, {})(AdminCategoryContainer);

