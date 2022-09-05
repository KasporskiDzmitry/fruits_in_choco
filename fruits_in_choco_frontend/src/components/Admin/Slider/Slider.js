import React, {useEffect, useState} from "react";
import style from "../Product/AddProduct/AddProduct.module.scss";
import {Field, reduxForm} from "redux-form";
import {Input, Select, Textarea} from "../../common/FormsControls/FormsControls";
import {number, required} from "../../utils/validators/validators";
import formsControlsStyle from "../../common/FormsControls/FormsControls.module.scss";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {loadSlides} from "../../../redux/thunks/main_thunks";
import {deleteSlide, saveSlide} from "../../../redux/thunks/admin_thunks";

const AddSlideForm = ({handleSubmit, error, isFetching}) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Название</div>
                <Field className={style.field} placeholder={'Title'} name={'title'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Текст</div>
                <Field className={style.field} placeholder={'Text'} name={'text'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>Ссылка</div>
                <Field className={style.field} placeholder={'Href'} name={'href'} component={Input} validate={[required]}/>
            </div>
            <div className={style.fieldWrapper}>
                <div className={style.label}>URL изображения</div>
                <Field className={style.field} placeholder={'Image URL'} name={'imageURL'} component={Input} validate={[required]}/>
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

const AddSlideReduxForm = reduxForm({form: 'add_slide'})(AddSlideForm);


export const Slider = (props) => {
    const dispatch = useDispatch();
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(loadSlides())
    }, [])

    const onSubmit = formData => {
        dispatch(saveSlide(formData));
    };

    const removeSlide = (slide) => {
        if (window.confirm('Удалить?')) {
            dispatch(deleteSlide(slide))
        }
    }


    return <div>
        <div>
            <AddSlideReduxForm onSubmit={onSubmit} />
        </div>
        <div>
            {
                props.slides.map(i => <div>
                    <div>{i.title}</div>
                    <div>{i.text}</div>
                    <div>{i.imageURL}</div>
                    <div>{i.href}</div>
                    <div onClick={() => removeSlide(i)}>Удалить</div>
                </div>)
            }
        </div>
    </div>
};