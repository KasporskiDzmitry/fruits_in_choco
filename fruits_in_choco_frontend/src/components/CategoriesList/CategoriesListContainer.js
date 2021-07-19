import React from 'react';
import {connect} from "react-redux";
import CategoriesList from "./CategoriesList";

class CategoriesListContainer extends React.Component {
    render() {
        return <CategoriesList {...this.props} />
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(CategoriesListContainer);