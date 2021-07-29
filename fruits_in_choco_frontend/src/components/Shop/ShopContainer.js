import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Shop from "./Shop.js";
import {withRouter} from "react-router-dom";
import {setFilteredTypes} from "../../redux/shop-reducer";

class ShopContainer extends React.Component {
    componentWillUnmount() {
        this.props.setFilteredTypes([]);
    }

    render() {
        return (
            <Shop {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    pathnames: state.appReducer.pathnames,
    products: state.shopReducer.products,
    categories: state.mainPage.categories,
    filteredTypes: state.shopReducer.filteredTypes
});

export default compose(
    connect(mapStateToProps, {setFilteredTypes}),
    withRouter
)(ShopContainer)
