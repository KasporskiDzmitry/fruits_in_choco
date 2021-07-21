import React from 'react';
import {connect} from "react-redux";
import Category from "./Category";

class CategoryContainer extends React.Component {
    render() {
        return <Category {...this.props} />
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(CategoryContainer);