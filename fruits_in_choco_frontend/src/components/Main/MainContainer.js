import React from "react";
import Main from "./Main.js";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {selectCategory} from "../../redux/actions/main_actions";
import {setFilteredTypes} from "../../redux/actions/shop_actions";

class MainContainer extends React.Component {

    render() {
        return <Main {...this.props}/>
    }
}

const mapStateToProps = state => ({
    categoryCards: state.mainPage.categories,
    products: state.shopReducer.products
});

export default compose(
    connect(mapStateToProps, {selectCategory, setFilteredTypes}),
    withRouter
)(MainContainer)

