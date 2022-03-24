import React from "react";
import {reduxForm} from "redux-form";
import Expire from "../../../common/Expire/Expire";
import {CategoryForm} from "../common/CategoryForm";
import style from './AddCategory.module.scss';

const AddCategoryReduxForm = reduxForm({form: 'add_category'})(CategoryForm);

const AddCategory = props => {
    const onSubmit = formData => {
        props.addCategory(formData);
    };

    return <div className={style.addCategoryContainer}>
        <h1>Add category</h1>
        {
            props.isCategoryAddedSuccess && <div>
                <Expire delay="3000"><h3>КАТЕГОРИЯ УСПЕШНО ДОБАВЛЕНА</h3></Expire>
            </div>
        }
        <AddCategoryReduxForm onSubmit={onSubmit}/>
    </div>
};

export default AddCategory;