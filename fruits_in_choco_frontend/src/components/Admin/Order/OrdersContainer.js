import React from "react";
import {connect} from "react-redux";
import Orders from "./Orders";

class OrdersContainer extends React.Component {

    componentDidMount() {
    }

    render() {
        return <Orders {...this.props} />
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(OrdersContainer);
