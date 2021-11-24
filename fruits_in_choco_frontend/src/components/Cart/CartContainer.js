import React from "react";
import {connect} from "react-redux";
import Cart from "./Cart";

class CartContainer extends React.Component {
    render() {
        return (
            <div>
                <Cart />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(CartContainer);