import React from 'react';
import {connect} from "react-redux";
import OurProductsSection from "./OurProductsSection";

class OurProductsSectionContainer extends React.Component {
    render() {
        return <OurProductsSection {...this.props} />
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(OurProductsSectionContainer);