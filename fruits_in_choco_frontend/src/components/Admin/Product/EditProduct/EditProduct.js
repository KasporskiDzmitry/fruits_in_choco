import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import style from './EditProduct.module.scss';
import {Button} from 'react-bootstrap';
import {number, required} from "../../../utils/validators/validators";
import {Input, Select, Textarea} from "../../../common/FormsControls/FormsControls";
import formsControlsStyle from "../../../common/FormsControls/FormsControls.module.scss";
import {connect, useDispatch, useSelector} from "react-redux";
import Rating from "@material-ui/lab/Rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {
    approveReview,
    deleteReview,
    loadProductById,
    updateProductThunk
} from "../../../../redux/thunks/product_thunks";

const EditProductForm = ({handleSubmit, error, categories, product, isProductUpdating}) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Название</div>
                <Field className={style.field} placeholder={'Name'} name={'name'} component={Input}
                       validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Цена</div>
                <Field className={style.field} placeholder={'Price'} name={'price'} component={Input}
                       validate={[required, number]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Описание</div>
                <Field className={style.field} placeholder={'Description'} name={'description'} component={Textarea}
                       validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>URL изображения</div>
                <Field className={style.field} placeholder={'Image URL'} name={'imageURL'} component={Textarea}
                       validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Категория</div>
                <Field className={style.field} name="category" disabled component={Input} validate={[required]}/>
            </div>
            {
                categories.find(c => c.id == product.categoryId)?.attributes.map(i => <div>
                        <div>{i.attributeName}</div>
                        <Field className={style.field} placeholder={i.attributeName} name={i.attributeName}
                               component={Input}
                               validate={[required]}/>
                    </div>)
            }
            <div className={style.fieldWrapper}>
                <div className={style.label}>Статус</div>
                <Field className={style.field} placeholder={'Status'} name={'status'} component={Select}
                       validate={[required]}>
                    <option></option>
                    <option>ACTIVE</option>
                    <option>NOT_CONFIRMED</option>
                    <option>DELETED</option>
                </Field>
            </div>
            {error && <div className={formsControlsStyle.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit" disabled={isProductUpdating}>Save</Button>
            </div>
        </form>
    )
};

let EditProductReduxForm = reduxForm({form: 'edit_product', enableReinitialize: true})(EditProductForm);

EditProductReduxForm = connect(
    state => {
        const product = state.productReducer.product;
        let category = "";
        if (product.categoryId) {
            category = state.categoryReducer.categories.find(i => i.id == product.categoryId);
        }
        return {
            initialValues: {...product, category: category.name, ...product.attributes},

        }
    }, {})(EditProductReduxForm)

const EditProduct = (props) => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const product = useSelector(state => state.productReducer.product);
    const isProductUpdating = useSelector(state => state.productReducer.isProductUpdating)
    const isReviewAccepting = useSelector(state => state.productReducer.isReviewAccepting)
    const isReviewDeleting = useSelector(state => state.productReducer.isReviewDeleting)

    useEffect(() => {
        dispatch(loadProductById(pathname.split('/').pop()));
    }, [])

    const onSubmit = formData => {
        let product = {...formData, category: props.categories.find(i => i.id === formData.categoryId)};
        dispatch(updateProductThunk(product));
    };

    const approve = (review, product) => {
        dispatch(approveReview({...review, approved: true}, product.id));
    }

    const remove = (product, ratingId) => {
        if (window.confirm('Удлаить?')) {
            dispatch(deleteReview(product, ratingId));
        }
    }

    return <>
        <div className={style.editProductFormContainer}>
            <h1>{product?.name}</h1>
            <EditProductReduxForm onSubmit={onSubmit} categories={props.categories} product={product} isProductUpdating={isProductUpdating}/>
            <div>

            </div>
        </div>
        <div className={style.reviewsContainer}>
            {
                product.ratings &&
                product.ratings.length > 0 ?
                    product.ratings.map(i => <div className={style.reviewItem}>
                        <div className={style.itemInfoContainer}>
                            <div className={style.heading}>
                                <h2>{i.author}</h2>
                                <Rating name="reviewRating" value={i.rating} readOnly/>
                            </div>
                            {/*<h3>{i.date?.toLocaleString()}}</h3>*/}
                            <p>{i.message}</p>
                        </div>
                        <div className={style.controlsContainer}>
                            {
                                !i.approved &&
                                <div className={style.controls}>
                                    <div title={'approve'} onClick={() => {if (!isReviewAccepting) approve(i, product)}}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </div>
                                    <div title={'reject'} onClick={() => {if (!isReviewDeleting) remove(product, i.id)}}>
                                        <FontAwesomeIcon icon={faTimesCircle}/>
                                    </div>
                                </div>
                            }
                            <div className={style.delete} onClick={() => {if (!isReviewDeleting) remove(product, i.id)}}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </div>
                        </div>
                    </div>) :
                    <div>No reviews</div>
            }
        </div>
    </>

};

export default EditProduct;