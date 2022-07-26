import React, {useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import BiscuitsTable from "./BiscuitsTable";
import FillingsTable from "./FillingsTable";
import DecorationsTable from "./DecorationsTable";
import {useDispatch} from "react-redux";
import {createConstructorData, loadData} from "../../../redux/thunks/cakeConstructor_thunks";
import {
    INGREDIENT_STATUS_ACTIVE,
    INGREDIENT_STATUS_DELETED,
    INGREDIENT_TYPE_BISCUIT,
    INGREDIENT_TYPE_DECORATION,
    INGREDIENT_TYPE_FILLING
} from "../../utils/constants";

const CakeConstructorData = ({data}) => {
    const dispatch = useDispatch();
    const [key, setKey] = useState('biscuits');

    useEffect(() => {
        dispatch(loadData())
    }, [])

    const onClickHandler = () => {
        dispatch(createConstructorData(key, {price: 0.0, status: INGREDIENT_STATUS_ACTIVE}));
    }

    return <div>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="cakeConstructorTable" className="mb-2">
            <Tab eventKey="biscuits" title="Бисквиты">
                <BiscuitsTable data={data.filter(i => i.type === INGREDIENT_TYPE_BISCUIT && i.status !== INGREDIENT_STATUS_DELETED)}/>
            </Tab>
            <Tab eventKey="fillings" title="Начинки">
                <FillingsTable data={data.filter(i => i.type === INGREDIENT_TYPE_FILLING && i.status !== INGREDIENT_STATUS_DELETED)}/>
            </Tab>
            <Tab eventKey="decorations" title="Украшения">
                <DecorationsTable data={data.filter(i => i.type === INGREDIENT_TYPE_DECORATION && i.status !== INGREDIENT_STATUS_DELETED)}/>
            </Tab>
        </Tabs>
        <div>
            <button onClick={onClickHandler}>+</button>
        </div>
    </div>
}

export default CakeConstructorData;