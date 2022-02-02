import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = state => ({
    cart: state.shopReducer.cart
});

export const emptyCartRedirect = Component => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.cart.length === 0) return <Redirect to={'/cart'}/>
            return <Component {...this.props} />
        }
    }

    const ConnectedEmptyCartRedirectedComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedEmptyCartRedirectedComponent;
}