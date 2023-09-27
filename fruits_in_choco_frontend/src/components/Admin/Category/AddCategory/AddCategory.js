import React from "react";
import {reduxForm} from "redux-form";
import {CategoryForm} from "../common/CategoryForm";
import style from './AddCategory.module.scss';
import {useDispatch} from "react-redux";
import {addCategory} from "../../../../redux/thunks/category_thunks";

const AddCategoryReduxForm = reduxForm({form: 'add_category'})(CategoryForm);

const AddCategory = () => {
    const dispatch = useDispatch();

    const onSubmit = formData => {
        dispatch(addCategory({...formData, attributes: formData.attributes || []}));
    };

    return <div className={style.addCategoryContainer}>
        <h1>Add category</h1>
        <AddCategoryReduxForm onSubmit={onSubmit}/>
    </div>
};

export default AddCategory;