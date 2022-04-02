import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {logout} from "../../redux/thunks/auth_thunks";
import {setFilteredCategories} from "../../redux/actions/shop_actions";
import {toggleCartLayout, toggleSignInSignUpPopUp} from "../../redux/actions/app_actions";
import {selectCategory} from "../../redux/actions/category_actions";

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}


// сделать через useSelector
const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth,
    login: state.authReducer.login,
    productCategories: state.categoryReducer.categories.map(i => i.id),
    productsInCart: localStorage.products ? JSON.parse(localStorage.products) : [],
    newReviews: state.shopReducer.products.length > 0 && state.shopReducer.products.map(i => i.ratings).flat().filter(i => !i.approved).length,
    newOrders: state.orderReducer.orders.length > 0 && state.orderReducer.orders.filter(i => i.status === 'NOT_CONFIRMED').length,
    isNotificationReceived: state.adminReducer.isNotificationReceived
});

export default compose(
    connect(mapStateToProps, {logout, selectCategory, setFilteredCategories, toggleSignInSignUpPopUp, toggleCartLayout}),
    withRouter
)(HeaderContainer)