import React from "react";
import {connect} from "react-redux";
import FruitsInChocolate from "./FruitsInChocolate";

class FruitsInChocolateContainer extends React.Component {
    render() {
        return (
            <FruitsInChocolate {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(FruitsInChocolateContainer);