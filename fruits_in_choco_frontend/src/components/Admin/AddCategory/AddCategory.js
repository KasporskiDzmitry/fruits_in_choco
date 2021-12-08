import React from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import formsControlsStyle from '../../common/FormsControls/FormsControls.module.scss';
import style from './AddCategory.module.scss';
import {Button} from 'react-bootstrap';
import {required} from "../../utils/validators/validators";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import Expire from "../../common/Expire/Expire";

const renderTypeFields = ({fields, meta: {error}}) => (
    <div>
        <div>
            <Button type="button" onClick={() => fields.push()}>Add type</Button>
        </div>
        {fields.map((i, index) => (
            <div key={index} className={style.fieldWrapper}>
                <Field
                    className={style.field}
                    name={i}
                    type="text"
                    component={Input}
                    validate={[required]}
                />
                <div className={style.removeField} onClick={() => fields.remove(index)}>&#10005;</div>
            </div>
        ))}
        {error && <div className="error">{error}</div>}
    </div>
)

const AddCategoryForm = ({handleSubmit, error, isFetching}) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Название</div>
                <Field className={style.field} placeholder={'Name'} name={'name'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>URL изображения</div>
                <Field className={style.field} placeholder={'Image URL'} name={'imageURL'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Описание</div>
                <Field className={style.field} placeholder={'Description'} name={'description'} component={Textarea} validate={[required]}/>
            </div>
            <FieldArray name="types" component={renderTypeFields}/>
            {error && <div className={formsControlsStyle.formSummaryError}>
                {error}
            </div>}
            <div>
                <Button type="submit" disabled={isFetching}>Add</Button>
            </div>
        </form>
    )
};

const AddCategoryReduxForm = reduxForm({form: 'add_category'})(AddCategoryForm);

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
        <AddCategoryReduxForm onSubmit={onSubmit} isFetching={props.isFetching}/>
    </div>
};

export default AddCategory;