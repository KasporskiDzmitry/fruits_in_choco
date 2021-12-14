import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import style from './AdminProductPage.module.scss';
import {Button} from 'react-bootstrap';
import {required} from "../../utils/validators/validators";
import {Input, Select, Textarea} from "../../common/FormsControls/FormsControls";
import Expire from "../../common/Expire/Expire";
import Preloader from "../../common/Preloader/Preloader";
import formsControlsStyle from "../../common/FormsControls/FormsControls.module.scss";
import {connect} from "react-redux";

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
            <div className={style.fieldWrapper}>
                <div className={style.label}>Тип</div>
                <Field className={style.field} name="typeId" disabled={true} component={Select} validate={[required]}>
                    <option></option>
                    {
                        categoryId &&
                        categories.find(i => i.id === categoryId).types.map(i => <option key={i.id}
                                                                                         value={i.id}>{i.name}</option>)
                    }
                </Field>
                <div>in progress...</div>
            </div>
            {error && <div className={formsControlsStyle.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit" disabled={isFetching}>Add</Button>
            </div>
        </form>
    )
};

let EditProductReduxForm = reduxForm({form: 'edit_product', enableReinitialize: true})(EditProductForm);

EditProductReduxForm = connect(
    state => ({
        initialValues: state.adminReducer.product
    }), {})(EditProductReduxForm)

const AdminProductPage = props => {
    const onSubmit = formData => {
        // props.addProduct({
        //     name: formData.name,
        //     description: formData.description,
        //     type: props.categories.find(i => i.id === parseInt(formData.category)).types.find(i => i.id === parseInt(formData.type)),
        //     price: parseInt(formData.price)
        // });
    };

    const approve = (review, productId) => {
        props.approveReview({...review, approved: true}, productId);
    }

    const remove = (productId, ratingId) => {
        props.deleteReview(productId, ratingId);
    }

    return <div className={style.addProductContainer}>
        {
            props.isFetching ?
                <Preloader/> :
                <div>
                    <h1>{props.product?.name}</h1>
                    {
                        props.isProductAddedSuccess && <div>
                            <Expire delay="3000"><h3>ПРОДУКТ УСПЕШНО ИЗМЕНЕН</h3></Expire>
                        </div>
                    }
                    <EditProductReduxForm onSubmit={onSubmit} isFetching={props.isFetching}
                                          categories={props.categories} product={props.product}/>
                    <div>
                        {
                            props.product.ratings &&
                            props.product.ratings.map(i => <div key={i.id}>
                                <div>{i.message}</div>
                                <div>{i.date}</div>
                                <div>{i.author}</div>
                                <div>{i.rating}</div>
                                {
                                    !i.approved &&
                                        <div>
                                            <div onClick={() => approve(i, props.product.id)}>APPROVE</div>
                                            <div onClick={() => remove(props.product.id, i.id)}>REJECT</div>
                                        </div>
                                }
                                <div onClick={() => remove(props.product.id, i.id)}>DELETE</div>
                            </div>)
                        }
                    </div>
                </div>
        }
    </div>
};

export default AdminProductPage;