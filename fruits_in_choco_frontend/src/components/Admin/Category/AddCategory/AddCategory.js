import React from "react";
import {reduxForm} from "redux-form";
import {CategoryForm} from "../common/CategoryForm";
import style from './AddCategory.module.scss';

const AddCategoryReduxForm = reduxForm({form: 'add_category'})(CategoryForm);

const AddCategory = props => {
    const onSubmit = formData => {
        props.addCategory(formData);
    };

    return <div className={style.addCategoryContainer}>
        <h1>Add category</h1>
        <AddCategoryReduxForm onSubmit={onSubmit}/>
    </div>
};

export default AddCategory;