import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import style from './EditProduct.module.scss';
import {Button} from 'react-bootstrap';
import {number, required} from "../../../utils/validators/validators";
import {Input, Select, Textarea} from "../../../common/FormsControls/FormsControls";
import Expire from "../../../common/Expire/Expire";
import formsControlsStyle from "../../../common/FormsControls/FormsControls.module.scss";
import {connect, useDispatch, useSelector} from "react-redux";
import Rating from "@material-ui/lab/Rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {
    approveReview,
    deleteReview,
    loadProductByIdAdmin,
    updateProductThunk
} from "../../../../redux/thunks/admin_thunks";
import {useHistory} from "react-router-dom";

const EditProductForm = ({handleSubmit, error, categories, isFetching, product}) => {
    const [categoryId, setCategoryId] = useState(product.categoryId);

    const selectCategory = (e) => {
        setCategoryId(parseInt(e.currentTarget.value))
    }

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
                <Field className={style.field} name="categoryId" component={Select}
                       validate={[required]} onChange={selectCategory}>
                    <option></option>
                    {
                        categories.map(i => <option key={i.id} value={i.id}>{i.name}</option>)
                    }
                </Field>
            </div>
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
                <Button type="submit">Save</Button>
            </div>
        </form>
    )
};

let EditProductReduxForm = reduxForm({form: 'edit_product', enableReinitialize: true})(EditProductForm);

EditProductReduxForm = connect(
    state => ({
        initialValues: state.adminReducer.product
    }), {})(EditProductReduxForm)

const EditProduct = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadProductByIdAdmin(history.location.pathname.split('/').pop()));
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
            <h1>{props.product?.name}</h1>
            <EditProductReduxForm onSubmit={onSubmit} categories={props.categories} product={props.product}/>
            <div>

            </div>
        </div>
        <div className={style.reviewsContainer}>
            {
                props.product.ratings &&
                props.product.ratings.length > 0 ?
                    props.product.ratings.map(i => <div className={style.reviewItem}>
                        <div className={style.itemInfoContainer}>
                            <div className={style.heading}>
                                <h2>{i.author}</h2>
                                <Rating name="reviewRating" value={i.rating} readOnly/>
                            </div>
                            <h3>{i.date.toLocaleString()}</h3>
                            <p>{i.message}</p>
                        </div>
                        <div className={style.controlsContainer}>
                            {
                                !i.approved &&
                                <div className={style.controls}>
                                    <div title={'approve'} onClick={() => approve(i, props.product)}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </div>
                                    <div title={'reject'} onClick={() => remove(props.product, i.id)}>
                                        <FontAwesomeIcon icon={faTimesCircle}/>
                                    </div>
                                </div>
                            }
                            <div className={style.delete} onClick={() => remove(props.product, i.id)}>
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