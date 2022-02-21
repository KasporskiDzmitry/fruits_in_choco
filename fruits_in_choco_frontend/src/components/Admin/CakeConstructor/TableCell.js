import React, {useState} from 'react';
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux";
import {updateConstructorData} from "../../../redux/thunks/cakeConstructor_thunks";


export const createCell = (objectType, columnName) => {

    const TableCell = props => {
        const row = props.row;
        const [value, setValue] = useState(props.children);
        const dispatch = useDispatch();

        const onBlur = (newValue) => {
            if (props.children.toString() !== newValue.toString()) {
                dispatch(updateConstructorData(objectType, {
                    ...row,
                    [columnName]: newValue
                }))
            }
        }

        return (
            <div>
                <input type="text" onChange={(e) => setValue(e.target.value)} value={value}
                       onBlur={(e) => onBlur(e.target.value)}/>
            </div>
        );
    }

    const propTypes = {
        row: PropTypes.object.isRequired,
    };
    TableCell.propTypes = propTypes;

    return TableCell;
}
