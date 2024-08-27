import React, { useEffect } from 'react';
import style from './EditCategoryPage.module.scss';
import { reduxForm } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { CategoryForm } from '../common/CategoryForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadCategoryById, updateCategoryThunk } from '../../../../redux/thunks/category_thunks';

let EditCategoryReduxForm = reduxForm({
    form: 'edit_category',
    enableReinitialize: true,
})(CategoryForm);

EditCategoryReduxForm = connect((state) => {
    return {
        initialValues: state.categoryReducer.category,
    };
}, {})(EditCategoryReduxForm);

const EditCategoryPage = (props) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(loadCategoryById(pathname.split('/').pop()));
    }, []);

    const onSubmit = (formData) => {
        dispatch(updateCategoryThunk(formData));
    };

    return (
        <div className={style.editProductFormContainer}>
            <h1>{props.category?.name}</h1>
            <EditCategoryReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default EditCategoryPage;
