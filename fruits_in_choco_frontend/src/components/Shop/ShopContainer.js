import React from "react";
import Main from "./Shop.js";
import {connect} from "react-redux";
import {compose} from "redux";
import Shop from "./Shop.js";
import {withRouter} from "react-router-dom";

class ShopContainer extends React.Component {
    render() {
        return (
            <Shop {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    pathnames: state.shopReducer.pathnames
});

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(ShopContainer)

// export default connect(mapStateToProps, {})(ShopContainer);