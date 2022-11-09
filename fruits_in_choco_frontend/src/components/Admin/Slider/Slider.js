import React, {useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import formsControlsStyle from "../../common/FormsControls/FormsControls.module.scss";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import style from "./Slider.module.scss";
import {deleteSlide, loadSlides, saveSlide} from "../../../redux/thunks/slide_thunks";
import Slide from "./Slide";

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


const Slider = (props) => {
    const dispatch = useDispatch();
    const slides = useSelector(state => state.slideReducer.slides);

    useEffect(() => {
        if (slides.length === 0) {
            dispatch(loadSlides())
        }
    }, [])

    const onSubmit = formData => {
        dispatch(saveSlide(formData));
    };

    const removeSlide = (slide) => {
        if (window.confirm('Удалить?')) {
            dispatch(deleteSlide(slide))
        }
    }

    return <div className={style.container}>
        <div>
            <AddSlideReduxForm onSubmit={onSubmit} />
        </div>
        <div className={style.slidesContainer}>
            {
                slides.length > 0 && slides.map(i => <Slide slide={i} removeSlide={removeSlide}/>)
            }
        </div>
    </div>
};

export default Slider;