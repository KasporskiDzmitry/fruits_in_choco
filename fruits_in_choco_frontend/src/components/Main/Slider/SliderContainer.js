import React from 'react';
import {connect} from "react-redux";
import Slider from "./Slider";
import {loadSlides} from "../../../redux/app-reducer";

class SliderContainer extends React.Component {

    componentDidMount() {
        this.props.loadSlides();

    }

    render() {
        return <Slider slides={this.props.slides} />
    }
}

const mapStateToProps = state => ({
    slides: state.mainPage.slides
});

export default connect(mapStateToProps, {loadSlides})(SliderContainer);