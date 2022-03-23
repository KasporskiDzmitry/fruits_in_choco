import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import style from './EditProduct.module.scss';
import reviewItemStyle from '../../../Shop/ProductPage/ProductPage.module.scss';
import {Button} from 'react-bootstrap';
import {required} from "../../../utils/validators/validators";
import {Input, Select, Textarea} from "../../../common/FormsControls/FormsControls";
import Expire from "../../../common/Expire/Expire";
import Preloader from "../../../common/Preloader/Preloader";
import formsControlsStyle from "../../../common/FormsControls/FormsControls.module.scss";
import {connect} from "react-redux";
import Rating from "@material-ui/lab/Rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCheckCircle, faClosedCaptioning, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

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
                       validate={[required]}/>
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
                <Field className={style.field} disabled={true} name="categoryId" component={Select}
                       validate={[required]} onChange={selectCategory}>
                    <option></option>
                    {
                        categories.map(i => <option key={i.id} value={i.id}>{i.name}</option>)
                    }
                </Field>
                <div>in progress...</div>
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

const EditProduct = props => {
    const onSubmit = formData => {
        // props.addProduct({
        //     name: formData.name,
        //     description: formData.description,
        //     type: props.categories.find(i => i.id === parseInt(formData.category)).types.find(i => i.id === parseInt(formData.type)),
        //     price: parseInt(formData.price)
        // });
    };

    const approve = (review, product) => {
        props.approveReview({...review, approved: true}, product.id);
    }

    const remove = (product, ratingId) => {
        if (window.confirm('Удлаить?')) {
            props.deleteReview(product.id, ratingId);
        }
    }

    return <>
        <div className={style.editProductFormContainer}>
            <h1>{props.product?.name}</h1>
            {
                props.isProductAddedSuccess && <div>
                    <Expire delay="3000"><h3>ПРОДУКТ УСПЕШНО ИЗМЕНЕН</h3></Expire>
                </div>
            }
            <EditProductReduxForm onSubmit={onSubmit}
                                  categories={props.categories} product={props.product}/>
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