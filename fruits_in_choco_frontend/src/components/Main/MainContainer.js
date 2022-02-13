import React from "react";
import Main from "./Main.js";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {setFilteredCategories} from "../../redux/actions/shop_actions";
import {selectCategory} from "../../redux/actions/category_actions";

class MainContainer extends React.Component {

    render() {
        return <Main {...this.props}/>
    }
}

const mapStateToProps = state => ({
    categoryCards: state.categoryReducer.categories,
    products: state.shopReducer.products
});

export default compose(
    connect(mapStateToProps, {selectCategory, setFilteredCategories}),
    withRouter
)(MainContainer)

