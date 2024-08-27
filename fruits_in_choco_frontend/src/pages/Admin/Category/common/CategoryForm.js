import React from 'react';
import { Button } from 'react-bootstrap';
import { Field, FieldArray } from 'redux-form';
import { Input, Textarea } from '../../../../components/common/FormsControls/FormsControls';
import { required } from '../../../../util/validators/validators';
import style from './CategoryForm.module.scss';

export const CategoryForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Название</div>
                <Field
                    className={style.field}
                    placeholder={'Name'}
                    name={'name'}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>URL изображения</div>
                <Field
                    className={style.field}
                    placeholder={'Image URL'}
                    name={'imageURL'}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Описание</div>
                <Field
                    className={style.field}
                    placeholder={'Description'}
                    name={'description'}
                    component={Textarea}
                    validate={[required]}
                />
            </div>
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
};
