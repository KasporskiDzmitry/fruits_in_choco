import React, {useState} from 'react';
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux";
import {updateConstructorData} from "../../../redux/thunks/cakeConstructor_thunks";
import usePrevious from "../../hooks/usePrevious";


export const createCell = (objectType, columnName) => {
    const TableCell = props => {
        const row = props.row;
        const [value, setValue] = useState(props.children);
        const prevValue = usePrevious(value);
        const dispatch = useDispatch();

        const onBlur = () => {
            if (value !== prevValue) {
                dispatch(updateConstructorData(objectType, {
                    ...row,
                    [columnName]: value
                }))
            }
        }

        return (
            <div>
                <input type={typeof props.children == "number" ? "number" : "text"}
                       onChange={(e) => setValue(e.target.value)} value={value}
                       onBlur={onBlur}/>
            </div>
        );
    }

    const propTypes = {
        row: PropTypes.object.isRequired,
    };
    TableCell.propTypes = propTypes;

    return TableCell;
}
