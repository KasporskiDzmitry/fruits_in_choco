import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {logout} from "../../redux/auth-reducer";
import {selectCategory} from "../../redux/main-reducer";
import {setFilteredTypes} from "../../redux/shop-reducer";
// import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth,
    login: state.authReducer.login,
    productTypes: state.mainPage.categories.map(i => i.types).flat().map(i => i.id)
    // login: state.auth.login
});

export default compose(
    connect(mapStateToProps, {logout, selectCategory, setFilteredTypes}),
    withRouter
)(HeaderContainer)