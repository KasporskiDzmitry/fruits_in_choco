import React from "react";
import {connect} from "react-redux";
import ProductPage from "./ProductPage";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class ProductPageContainer extends React.Component {
    componentDidMount() {
        console.log(this.props.history)
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ProductPage {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({

});

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(ProductPageContainer)
