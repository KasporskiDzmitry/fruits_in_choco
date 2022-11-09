import React from "react";
import {Button} from "react-bootstrap";
import {Field, FieldArray} from "redux-form";
import {Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import style from './CategoryForm.module.scss';

const renderAttributes = ({ fields, meta: { error } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push()}>
                Add Attribute
            </button>
        </li>
        {fields.map((attribute, index) => (
            <li key={index}>
                <button
                    type="button"
                    title="Remove Attribute"
                    onClick={() => fields.remove(index)}
                />
                <Field
                    name={`${attribute}.attributeName`}
                    type="text"
                    component={Input}
                    label={`Attribute #${index + 1}`}
                />
            </li>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
)

export const CategoryForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Название</div>
                <Field className={style.field} placeholder={'Name'} name={'name'} component={Input}
                       validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>URL изображения</div>
                <Field className={style.field} placeholder={'Image URL'} name={'imageURL'} component={Input}
                       validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Описание</div>
                <Field className={style.field} placeholder={'Description'} name={'description'} component={Textarea}
                       validate={[required]}/>
            </div>
            <div>
                <FieldArray name={`attributes`} component={renderAttributes} />
            </div>
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    )
};