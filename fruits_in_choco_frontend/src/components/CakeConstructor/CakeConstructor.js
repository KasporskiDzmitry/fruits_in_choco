import React, {useEffect} from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import style from "../common/FormsControls/FormsControls.module.scss";
import constructorStyle from "./CakeConstructor.module.scss";
import {Button} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import CheckboxGroup from "../common/CheckboxGroup/CheckboxGroup";
import CakeViewer from "./CakeViewer";
import {loadData, saveCake} from "../../redux/thunks/cakeConstructor_thunks";
import {setCake} from "../../redux/actions/cakeConstructor_actions";
import {INGREDIENT_TYPE_BISCUIT, INGREDIENT_TYPE_DECORATION, INGREDIENT_TYPE_FILLING} from "../utils/constants";
import appStyle from '../../App.module.scss';


const CakeConstructorForm = (props) => {
    const dispatch = useDispatch();
    const {handleSubmit, error, data} = props;

    const fillingsGroup = data.filter(i => i.type === INGREDIENT_TYPE_FILLING).map(i => ({label: i.name, value: i.id.toString()}));
    const decorationsGroup = data.filter(i => i.type === INGREDIENT_TYPE_DECORATION).map(i => ({label: i.name, value: i.id.toString()}));

    useEffect(() => {
        const cake = {
            biscuit: props.biscuitSelector,
            fillings: props.fillingsSelector && data.filter(i => i.type === INGREDIENT_TYPE_FILLING).filter(i => props.fillingsSelector.includes(i.id.toString())),
            decorations: props.decorationsSelector && data.filter(i => i.type === INGREDIENT_TYPE_DECORATION).filter(i => props.decorationsSelector.includes(i.id.toString())),
        }
        dispatch(setCake(cake));
    }, [props.biscuitSelector, props.fillingsSelector, props.decorationsSelector])

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>Вес</div>
                <div>
                    <label>1 кг</label>
                    <Field name={'weight'} type={"radio"} value={'1'} component={Input}/>
                </div>
                <div>
                    <label>2 кг</label>
                    <Field name={'weight'} type={"radio"} value={'2'} component={Input}/>
                </div>
            </div>
            <div>
                <div>Бисквит</div>
                {
                    data.filter(i => i.type === INGREDIENT_TYPE_BISCUIT).map((i, idx) => <div key={i.id}>
                        <label>{i.name}</label>
                        <Field name={'biscuit'} type={"radio"} value={i.name} component={Input}/>
                    </div>)
                }
            </div>
            <div>
                <div>Начинка</div>
                <CheckboxGroup name="fillings" options={fillingsGroup}/>
            </div>
            <div>
                <div>Украшения</div>
                <CheckboxGroup name="decorations" options={decorationsGroup}/>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit">Order</Button>
            </div>
        </form>
    )
};


let CakeConstructorReduxForm = reduxForm({form: 'cakeConstructor', enableReinitialize: true})(CakeConstructorForm);

const selector = formValueSelector('cakeConstructor')
CakeConstructorReduxForm = connect(state => {
    const {biscuit, fillings, decorations} = selector(state, 'biscuit', 'fillings', 'decorations')
    return {
        initialValues: {biscuit: 'Vanilla'},
        biscuitSelector: biscuit,
        fillingsSelector: fillings,
        decorationsSelector: decorations
    }
})(CakeConstructorReduxForm)

const CakeConstructor = (props) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cakeConstructorReducer.data)
    const cake = useSelector((state) => state.cakeConstructorReducer.cake)

    useEffect(() => {
        dispatch(loadData());
    }, [])

    const onSubmit = (formData) => {
        const cake = {
            weight: parseInt(formData.weight),
            ingredients: data.filter(i => i.name === formData.biscuit || formData.fillings.includes(i.id.toString()) || formData.decorations.includes(i.id.toString())), //:TODO refactor
            price: 100,
            name: "Торт " + formData.biscuit
        }
        dispatch(saveCake(cake))
    }

    return <div className={`${appStyle.sectionOuter} ${constructorStyle.constructorSection}`}>
        <div className={`${appStyle.sectionInner}`}>
            <div className={constructorStyle.formWrapper}>
                <CakeConstructorReduxForm onSubmit={onSubmit} data={data}/>
            </div>
            <CakeViewer cake={cake}/>
        </div>
    </div>
};

export default CakeConstructor;