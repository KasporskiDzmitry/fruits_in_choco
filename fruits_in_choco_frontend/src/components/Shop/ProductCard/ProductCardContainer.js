import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import ProductCard from "./ProductCard";

class ProductCardContainer extends React.Component {

    render() {
        return (
            <ProductCard {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(ProductCardContainer);