import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

const propTypes = {
    row: PropTypes.object.isRequired,
};

class OrderTableActions extends Component {
    render() {
        const row = this.props.row;
        return (
            <div>
                <NavLink to={`/#`}>Info</NavLink>
            </div>
        );
    }
}

OrderTableActions.propTypes = propTypes;
export default OrderTableActions;