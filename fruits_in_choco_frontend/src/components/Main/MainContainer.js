import React from "react";
import Main from "./Main.js";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {loadCategoryCards} from "../../redux/app-reducer";
import {setFilteredTypes} from "../../redux/shop-reducer";

class MainContainer extends React.Component {

    render() {
        return (
            <Main {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    categoryCards: state.mainPage.categories,
    products: state.shopReducer.products
    // isAuth: state.auth.isAuth,
    // login: state.auth.login
});

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(MainContainer)

