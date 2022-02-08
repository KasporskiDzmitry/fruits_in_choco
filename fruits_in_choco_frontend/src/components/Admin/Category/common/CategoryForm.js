import React from "react";
import {Button} from "react-bootstrap";
import {Field, FieldArray} from "redux-form";
import {Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import formsControlsStyle from "../../../common/FormsControls/FormsControls.module.scss";
import style from './CategoryForm.module.scss';

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

export const CategoryForm = ({handleSubmit, error, isFetching}) => {
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
                <Button type="submit" disabled={isFetching}>Submit</Button>
            </div>
        </form>
    )
};