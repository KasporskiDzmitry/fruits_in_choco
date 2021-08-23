import React from "react";
import Main from "./Main.js";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {selectCategory} from "../../redux/main-reducer";
import {setFilteredTypes} from "../../redux/shop-reducer";

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

