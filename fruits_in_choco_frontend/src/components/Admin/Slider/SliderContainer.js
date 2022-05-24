import React from "react";
import {Slider} from "./Slider";
import {connect} from "react-redux";
import {deleteSlide, saveSlide, updateSlide} from "../../../redux/thunks/admin_thunks";
import {loadSlides} from "../../../redux/thunks/main_thunks";

class SliderContainer extends React.Component {

    componentDidMount() {
        this.props.loadSlides();
    }

    render() {
        return <Slider {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    slides: state.mainPage.slides
})

export default connect(mapStateToProps, {loadSlides, saveSlide, updateSlide, deleteSlide})(SliderContainer);