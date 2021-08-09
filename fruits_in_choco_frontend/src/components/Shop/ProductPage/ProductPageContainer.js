import React from "react";
import {connect} from "react-redux";
import ProductPage from "./ProductPage";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {loadProductById} from "../../../redux/shop-reducer";

class ProductPageContainer extends React.Component {
    componentDidMount() {
        this.props.loadProductById(this.props.history.location.state.id);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ProductPage product={this.props.product}/>
        );
    }
}

const mapStateToProps = state => ({
    product: state.shopReducer.currentProduct
});

export default compose(
    connect(mapStateToProps, {loadProductById}),
    withRouter
)(ProductPageContainer)
