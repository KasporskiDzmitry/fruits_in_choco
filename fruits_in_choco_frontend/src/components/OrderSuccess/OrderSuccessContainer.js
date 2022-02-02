import React from "react";
import {OrderSuccess} from "./OrderSuccess";
import {compose} from "redux";
import {connect} from "react-redux";
import {emptyCartRedirect} from "../hoc/emptyCartRedirect";

class OrderSuccessContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return <OrderSuccess />
    }
}

const mapStateToProps = state => ({

})

export default compose(
    connect(mapStateToProps, {})
)(OrderSuccessContainer);