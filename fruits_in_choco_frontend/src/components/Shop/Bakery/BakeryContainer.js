import React from "react";
import {connect} from "react-redux";
import Bakery from "./Bakery";

class BakeryContainer extends React.Component {
    render() {
        return (
            <Bakery {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(BakeryContainer);