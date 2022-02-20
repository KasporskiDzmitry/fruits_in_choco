import React from 'react';
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux";
import {deleteConstructorData} from "../../../redux/thunks/cakeConstructor_thunks";

export const getActionsByTableName = (name) => {

    const Actions = (props) => {
        const dispatch = useDispatch();

        const handleDelete = (id) => {
            if (window.confirm("Удалить?")) {
                dispatch(deleteConstructorData(name, id))
            }
        }

        const row = props.row;
        return (
            <div>
                <div onClick={(e) => handleDelete(row.id)}>
                    Delete
                </div>
            </div>
        );
    };

    const propTypes = {
        row: PropTypes.object.isRequired,
    };


    Actions.propTypes = propTypes;
    return Actions;
}
