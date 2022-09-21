import React from "react";
import {reduxForm} from "redux-form";
import {CategoryForm} from "../common/CategoryForm";
import style from './AddCategory.module.scss';
import {useDispatch} from "react-redux";
import {addCategory} from "../../../../redux/thunks/admin_thunks";

const AddCategoryReduxForm = reduxForm({form: 'add_category'})(CategoryForm);

const AddCategory = props => {
    const dispatch = useDispatch();

    const onSubmit = formData => {
        dispatch(addCategory(formData));
    };

    return <div className={style.addCategoryContainer}>
        <h1>Add category</h1>
        <AddCategoryReduxForm onSubmit={onSubmit}/>
    </div>
};

export default AddCategory;