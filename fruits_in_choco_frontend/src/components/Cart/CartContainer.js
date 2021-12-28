import React from "react";
import {connect} from "react-redux";
import Cart from "./Cart";

class CartContainer extends React.Component {
    render() {
        return (
            <div>
                <Cart {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.shopReducer.cart
})

export default connect(mapStateToProps, {})(CartContainer);