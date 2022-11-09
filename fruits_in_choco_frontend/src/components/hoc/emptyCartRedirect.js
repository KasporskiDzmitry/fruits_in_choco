import React from "react";
import {connect} from "react-redux";
import {redirect} from "react-router-dom";

const mapStateToPropsForRedirect = state => ({
    cart: state.cartReducer.cart
});

export const emptyCartRedirect = Component => {
    class EmptyCartRedirectComponent extends React.Component {
        render() {
            if (this.props.cart.length === 0) return redirect('/cart')
            return <Component {...this.props} />
        }
    }

    const ConnectedEmptyCartRedirectedComponent = connect(mapStateToPropsForRedirect)(EmptyCartRedirectComponent);

    return ConnectedEmptyCartRedirectedComponent;
}