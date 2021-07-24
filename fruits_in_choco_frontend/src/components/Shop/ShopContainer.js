import React from "react";
import Main from "./Shop.js";
import {connect} from "react-redux";
import {compose} from "redux";
import Shop from "./Shop.js";
import {withRouter} from "react-router-dom";
import {loadProducts} from "../../redux/shop-reducer";

class ShopContainer extends React.Component {

    componentDidMount() {
        this.props.loadProducts();
    }

    render() {
        return (
            <Shop {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    pathnames: state.shopReducer.pathnames,
    products: state.shopReducer.products,
    selectedCategory: state.mainPage.selectedCategory
});

export default compose(
    connect(mapStateToProps, {loadProducts}),
    withRouter
)(ShopContainer)

// export default connect(mapStateToProps, {})(ShopContainer);