import React from "react";
import {connect} from "react-redux";
import Cart from "./Cart";
import {removeFromCart, updateProductInCart} from "../../redux/actions/shop_actions";

class CartContainer extends React.Component {
    render() {
        return <Cart {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    cart: state.shopReducer.cart
})

export default connect(mapStateToProps, {removeFromCart, updateProductInCart})(CartContainer);