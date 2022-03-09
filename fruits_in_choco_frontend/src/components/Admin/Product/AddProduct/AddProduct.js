import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import formsControlsStyle from '../../../common/FormsControls/FormsControls.module.scss';
import style from './AddProduct.module.scss';
import {Button} from 'react-bootstrap';
import {required} from "../../../utils/validators/validators";
import {Input, Select, Textarea} from "../../../common/FormsControls/FormsControls";
import Expire from "../../../common/Expire/Expire";

const AddProductForm = ({handleSubmit, error, categories, isFetching}) => {

    const [categoryId, setCategoryId] = useState(null);

    const selectCategory = (e) => {
        setCategoryId(parseInt(e.currentTarget.value))
    }

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Название</div>
                <Field className={style.field} placeholder={'Name'} name={'name'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Цена</div>
                <Field className={style.field} placeholder={'Price'} name={'price'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Описание</div>
                <Field className={style.field} placeholder={'Description'} name={'description'} component={Textarea} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>URL изображения</div>
                <Field className={style.field} placeholder={'Image URL'} name={'imageURL'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Категория</div>
                <Field className={style.field} name="category" component={Select} validate={[required]} onChange={selectCategory}>
                    <option></option>
                    {
                        categories.map(i => <option key={i.id} value={i.id}>{i.name}</option>)
                    }
                </Field>
            </div>
            {error && <div className={formsControlsStyle.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit">Add</Button>
            </div>
        </form>
    )
};

const AddProductReduxForm = reduxForm({form: 'add_product'})(AddProductForm);

const AddProduct = props => {
    const onSubmit = formData => {
        props.addProduct({
            name: formData.name,
            description: formData.description,
            category: props.categories.find(i => i.id === parseInt(formData.category)),
            price: parseInt(formData.price),
            status: 'ACTIVE'
        });
    };

    return <div className={style.addProductContainer}>
        <h1>Add product</h1>
        {
            props.isProductAddedSuccess && <div>
                <Expire delay="3000"><h3>ПРОДУКТ УСПЕШНО ДОБАВЛЕН</h3></Expire>
            </div>
        }
        <AddProductReduxForm onSubmit={onSubmit} categories={props.categories}/>
    </div>
};

export default AddProduct;