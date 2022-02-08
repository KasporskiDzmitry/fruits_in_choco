import React from "react";
import {connect} from "react-redux";
import Categories from "./Categories";

class CategoriesContainer extends React.Component {
    render() {
        return <Categories {...this.props}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoryReducer.categories,
});

export default connect(mapStateToProps, {})(CategoriesContainer);

