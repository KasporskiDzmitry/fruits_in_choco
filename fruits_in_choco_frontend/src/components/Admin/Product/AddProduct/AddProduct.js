import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import formsControlsStyle from '../../../common/FormsControls/FormsControls.module.scss';
import style from './AddProduct.module.scss';
import {Button} from 'react-bootstrap';
import {number, required} from "../../../utils/validators/validators";
import {Input, Select, Textarea} from "../../../common/FormsControls/FormsControls";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../../../redux/thunks/product_thunks";

const AddProductForm = ({handleSubmit, error, categories, isProductAdding}) => {

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
                <Field className={style.field} placeholder={'Price'} name={'price'} component={Input} validate={[required, number]}/>
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
            <div>
                {
                    categories.find(c => c.id == categoryId)?.attributes.map(i => <div>
                        <div>{i.attributeName}</div>
                        <Field className={style.field} placeholder={i.attributeName} name={i.attributeName}
                               component={Input}
                               validate={[required]}/>
                    </div>)
                }
            </div>
            {error && <div className={formsControlsStyle.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit" disabled={isProductAdding}>Add</Button>
            </div>
        </form>
    )
};

const AddProductReduxForm = reduxForm({form: 'add_product'})(AddProductForm);

const AddProduct = props => {
    const dispatch = useDispatch();
    const isProductAdding = useSelector(state => state.productReducer.isProductAdding)

    const onSubmit = formData => {
        const attributes = props.categories.find(c => c.id == parseInt(formData.category)).attributes.map(a => a.attributeName);
        let productAttrs = {}

        attributes.forEach(i => {
            productAttrs = {...productAttrs, ...{[i]: formData[i]}}
        })

        dispatch(addProduct({
            name: formData.name,
            description: formData.description,
            category: props.categories.find(i => i.id === parseInt(formData.category)),
            price: parseInt(formData.price),
            status: 'ACTIVE',
            imageURL: formData.imageURL,
            attributes: productAttrs
        }));
    };

    return <div className={style.addProductContainer}>
        <h1>Add product</h1>
        <AddProductReduxForm onSubmit={onSubmit} categories={props.categories} isProductAdding={isProductAdding}/>
    </div>
};

export default AddProduct;