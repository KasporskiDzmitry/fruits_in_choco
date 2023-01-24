import React, {useEffect, useState} from "react";
import style from "./Slider.module.scss";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {updateSlide} from "../../../redux/thunks/slide_thunks";

const Slide = ({slide, removeSlide}) => {
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState(slide);

    const toggleEditMode = (e) => {
        e.preventDefault();
        setIsEditMode(prevState => !prevState);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        toggleEditMode(e);
        dispatch(updateSlide(data))
    }

    const onChange = (e) => {
        const {name, value} = e.target;
        setData(prevState => ({...prevState, [name]: value}))
    }

    return <form key={slide.id} className={style.slideWrapper}>
        <div className={style.infoWrapper}>
            <div className={style.title}>
                <input type="text" name="title" value={data.title} disabled={!isEditMode} onChange={onChange}/>
            </div>
            <div className={style.text}>
                <input type="text" name="text" value={data.text} disabled={!isEditMode} onChange={onChange}/>
            </div>
            <div className={style.href}>
                <input type="text" name="href" value={data.href} disabled={!isEditMode} onChange={onChange}/>
            </div>
        </div>
        <div className={style.imageWrapper}><img src={data.imageURL} alt=""/></div>
        <div className={style.controlsWrapper}>
            {
                isEditMode ?
                    <Button type="submit" className={style.saveBtn}
                            onClick={onSubmit}>Сохранить</Button> :
                    <Button type="button" className={style.editBtn}
                            onClick={toggleEditMode}>Редактировать</Button>
            }
            <div className={style.removeBtn} onClick={() => removeSlide()}>Удалить</div>
        </div>
    </form>
}

export default Slide;