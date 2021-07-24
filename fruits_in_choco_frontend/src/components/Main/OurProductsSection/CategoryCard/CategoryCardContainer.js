import React from 'react';
import {connect} from "react-redux";
import CategoryCard from "./CategoryCard";

class CategoryCardContainer extends React.Component {
    render() {
        return <CategoryCard {...this.props} />
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(CategoryCardContainer);