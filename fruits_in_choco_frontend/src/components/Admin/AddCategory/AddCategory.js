import React from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import style from '../../common/FormsControls/FormsControls.module.scss';
import {Button} from 'react-bootstrap';
import {required} from "../../utils/validators/validators";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import Expire from "../../common/Expire/Expire";

const renderTypeFields = ({fields, meta: {error}}) => (
    <div>
        <div>
            <button type="button" onClick={() => fields.push()}>
                Add type
            </button>
        </div>
        {fields.map((i, index) => (
            <div key={index}>
                <Button
                    type="button"
                    title="Remove type"
                    onClick={() => fields.remove(index)}
                >Remove type</Button>
                <Field
                    name={i}
                    type="text"
                    component={Input}
                    validate={[required]}
                />
            </div>
        ))}
        {error && <div className="error">{error}</div>}
    </div>
)

const AddCategoryForm = ({handleSubmit, error, isFetching}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Name'} name={'name'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Image URL'} name={'imageURL'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Description'} name={'description'} component={Textarea} validate={[required]}/>
            </div>
            <FieldArray name="types" component={renderTypeFields}/>
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

const AddCategoryReduxForm = reduxForm({form: 'add_category'})(AddCategoryForm);

const AddCategory = props => {
    const onSubmit = formData => {
        props.addCategory(formData);
    };

    return <div>
        <h1>Add category</h1>
        {
            props.isCategoryAddedSuccess && <div>
                <Expire delay="3000"><h3>КАТЕГОРИЯ УСПЕШНО ДОБАВЛЕН</h3></Expire>
            </div>
        }
        <AddCategoryReduxForm onSubmit={onSubmit} isFetching={props.isFetching}/>
    </div>
};

export default AddCategory;