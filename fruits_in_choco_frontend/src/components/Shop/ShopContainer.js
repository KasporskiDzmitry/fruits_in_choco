import React from "react";
import Main from "./Shop.js";
import {connect} from "react-redux";
import Shop from "./Shop.js";

class ShopContainer extends React.Component {
    render() {
        return (
            <Shop/>
        );
    }
}

const mapStateToProps = state => ({
    // isAuth: state.auth.isAuth,
    // login: state.auth.login
});

export default connect(mapStateToProps, {})(ShopContainer);