import React from "react";
import {connect} from "react-redux";
import Bouquets from "./Bouquets";

class BouquetsContainer extends React.Component {
    render() {
        return (
            <Bouquets {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(BouquetsContainer);