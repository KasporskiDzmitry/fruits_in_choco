import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {logout} from "../../redux/thunks/auth_thunks";
import {selectCategory} from "../../redux/actions/main_actions";
import {setFilteredTypes, toggleIsCartShow} from "../../redux/actions/shop_actions";
import {togglePopUp} from "../../redux/actions/app_actions";

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}


// сделать через useSelector
const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth,
    login: state.authReducer.login,
    productTypes: state.mainPage.categories.map(i => i.types).flat().map(i => i.id),
    productsInCart: state.shopReducer.cart.length
});

export default compose(
    connect(mapStateToProps, {logout, selectCategory, setFilteredTypes, togglePopUp, toggleIsCartShow}),
    withRouter
)(HeaderContainer)