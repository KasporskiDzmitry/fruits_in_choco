import React from "react";
import {connect} from "react-redux";
import Filter from "./Filter.js";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {loadProductsByTypes} from "../../../redux/shop-reducer";

class FilterContainer extends React.Component {


    render() {
        return (
            <Filter {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
});

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(FilterContainer)
