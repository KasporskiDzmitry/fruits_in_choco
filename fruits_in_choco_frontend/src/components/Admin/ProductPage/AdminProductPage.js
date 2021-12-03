import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import style from '../../common/FormsControls/FormsControls.module.scss';
import {Button} from 'react-bootstrap';
import {required} from "../../utils/validators/validators";
import {Input, Select, Textarea} from "../../common/FormsControls/FormsControls";
import Expire from "../../common/Expire/Expire";
import Preloader from "../../common/Preloader/Preloader";

const EditProductForm = ({handleSubmit, error, categories, isFetching}) => {

    const [categoryId, setCategoryId] = useState(null);

    const selectCategory = (e) => {
        setCategoryId(parseInt(e.currentTarget.value))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Name'} name={'name'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Price'} name={'price'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Description'} name={'description'} component={Textarea} validate={[required]}/>
            </div>
            <Field name="category" component={Select} validate={[required]} onChange={selectCategory}>
                <option></option>
                {
                    categories.map(i => <option key={i.id} value={i.id}>{i.name}</option>)
                }
            </Field>
            <Field name="type" component={Select} disabled={!categoryId} validate={[required]}>
                <option></option>
                {
                    categoryId &&
                    categories.find(i => i.id === categoryId).types.map(i => <option key={i.id}
                                                                                     value={i.id}>{i.name}</option>)
                }
            </Field>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit" disabled={isFetching}>Add</Button>
            </div>
        </form>
    )
};

const EditProductReduxForm = reduxForm({form: 'edit_product'})(EditProductForm);

const AdminProductPage = props => {
    const onSubmit = formData => {
        // props.addProduct({
        //     name: formData.name,
        //     description: formData.description,
        //     type: props.categories.find(i => i.id === parseInt(formData.category)).types.find(i => i.id === parseInt(formData.type)),
        //     price: parseInt(formData.price)
        // });
    };

    return <div>
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
                                          categories={props.categories}/>
                </div>
        }
    </div>
};

export default AdminProductPage;