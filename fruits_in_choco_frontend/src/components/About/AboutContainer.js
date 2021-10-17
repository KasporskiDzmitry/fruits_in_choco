import React from "react";
import {connect} from "react-redux";
import About from "./About.js";

class AboutContainer extends React.Component {
    render() {
        return (
            <About/>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(AboutContainer);