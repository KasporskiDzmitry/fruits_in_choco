import React from "react";
import {connect} from "react-redux";
import Filter from "./Filter.js";

class FilterContainer extends React.Component {
    render() {
        console.log(this.props.selectedCategory)
        return (
            <Filter {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    products: state.shopReducer.products,
    selectedCategory: state.mainPage.selectedCategory
});

export default connect(mapStateToProps, {})(FilterContainer);