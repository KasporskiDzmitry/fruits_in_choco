import React from "react";
import Main from "./Main.js";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {loadProducts} from "../../redux/main-reducer";

class MainContainer extends React.Component {

    componentDidMount() {
        this.props.loadProducts();
    }


    render() {
        return (
            <Main {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    products: state.mainPage.products
    // isAuth: state.auth.isAuth,
    // login: state.auth.login
});

export default compose(
    connect(mapStateToProps, {loadProducts}),
    withRouter
)(MainContainer)

