import React from "react";
import style from './EditCategoryPage.module.scss';
import {Field, FieldArray, reduxForm} from "redux-form";
import {connect} from "react-redux";
import Preloader from "../../../common/Preloader/Preloader";
import Expire from "../../../common/Expire/Expire";
import {CategoryForm} from "../common/CategoryForm";

let EditCategoryReduxForm = reduxForm({form: 'edit_category', enableReinitialize: true})(CategoryForm);

EditCategoryReduxForm = connect(
    state => {
        const category = state.categoryReducer.category;
        let types = [];
        if (category.types) {
            types = state.categoryReducer.category.types.map(i => i.name);
        }
        return ({
            initialValues: {...state.categoryReducer.category, types: types}
        })
    }, {})(EditCategoryReduxForm)

export const EditCategoryPage = (props) => {

    const onSubmit = (formData) => {
    }

    return <div className={style.editProductFormContainer}>
        <h1>{props.category?.name}</h1>
        {
            props.isCategoryAddedSuccess && <div>
                <Expire delay="3000"><h3>КАТЕГОРИЯ УСПЕШНО ИЗМЕНЕНА</h3></Expire>
            </div>
        }
        <EditCategoryReduxForm onSubmit={onSubmit} isFetching={props.isFetching}
                               category={props.category}/>
    </div>
};