import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { Input, Textarea } from '../FormsControls/FormsControls';
import { required } from '../../../util/validators/validators';
import formsControlsStyle from '../FormsControls/FormsControls.module.scss';
import { Button } from 'react-bootstrap';
import style from './Form.module.scss';

export const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.form}>
            {props.fields.map((i) => (
                <div className={style.fieldWrapper}>
                    <div className={style.label}>{i.label}</div>
                    <Field
                        className={style.field}
                        placeholder={i.placeholder}
                        name={i.name}
                        component={i.component}
                        validate={i.validators}
                    />
                </div>
            ))}
            {props.fieldArray && (
                <FieldArray name={props.fieldArray.name} component={props.fieldArray.fields} />
            )}
            {props.error && (
                <div className={formsControlsStyle.formSummaryError}>{props.error}</div>
            )}
            <div>
                <Button type="submit" disabled={props.isFetching}>
                    {props.submitName}
                </Button>
            </div>
        </form>
    );
};
