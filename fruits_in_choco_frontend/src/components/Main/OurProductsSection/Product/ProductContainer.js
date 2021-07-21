import React from 'react';
import {connect} from "react-redux";
import Product from "./Product";

class ProductContainer extends React.Component {
    render() {
        return <Product {...this.props} />
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(ProductContainer);