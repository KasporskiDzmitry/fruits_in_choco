import React from "react";
import {connect} from "react-redux";
import Filter from "./Filter.js";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class FilterContainer extends React.Component {

    componentDidMount() {
        this.props.setFilteredTypes([...new Set(this.props.products.filter(p => p.category.id === this.props.selectedCategoryId).map(k => k.productType))]);
    }

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
