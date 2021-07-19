import React from 'react';
import {connect} from "react-redux";
import AboutSection from "./AboutSection";

class AboutSectionContainer extends React.Component {
    render() {
        return <AboutSection {...this.props} />
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(AboutSectionContainer);