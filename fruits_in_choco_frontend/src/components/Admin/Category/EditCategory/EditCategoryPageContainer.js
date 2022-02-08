import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {EditCategoryPage} from "./EditCategoryPage";
import {withRouter} from "react-router-dom";
import {loadCategoryById} from "../../../../redux/thunks/category_thunks";

class EditCategoryPageContainer extends React.Component {

    componentDidMount() {
        this.props.loadCategoryById(this.props.history.location.pathname.split('/').pop());
    }

    render() {
        return <EditCategoryPage {...this.props} />
    }
}

const mapStateToProps = state => ({
    category: state.categoryReducer.category,
    isFetching: state.adminReducer.isFetching
})

export default compose(
    connect(mapStateToProps, {loadCategoryById}),
    withRouter
)(EditCategoryPageContainer);