import React, {useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import BiscuitsTable from "./BiscuitsTable";
import FillingsTable from "./FillingsTable";
import DecorationsTable from "./DecorationsTable";
import {useDispatch, useSelector} from "react-redux";
import {createConstructorData, loadData} from "../../../redux/thunks/cakeConstructor_thunks";

const CakeConstructorData = (props) => {
    const data = useSelector(state => state.cakeConstructorReducer.data);
    const dispatch = useDispatch();
    const [key, setKey] = useState('biscuits');

    useEffect(() => {
        dispatch(loadData())
    }, [])

    const onClickHandler = () => {
        dispatch(createConstructorData(key, {price: 0.0, status: 'ACTIVE'}));
    }

    return <div>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="cakeConstructorTable" className="mb-2">
            <Tab eventKey="biscuits" title="Бисквиты">
                <BiscuitsTable data={data.filter(i => i.type === "BISCUIT" && i.status !== 'DELETED')}/>
            </Tab>
            <Tab eventKey="fillings" title="Начинки">
                <FillingsTable data={data.filter(i => i.type === "FILLING" && i.status !== 'DELETED')}/>
            </Tab>
            <Tab eventKey="decorations" title="Украшения">
                <DecorationsTable data={data.filter(i => i.type === "DECORATION" && i.status !== 'DELETED')}/>
            </Tab>
        </Tabs>
        <div>
            <button onClick={onClickHandler}>+</button>
        </div>
    </div>
}

export default CakeConstructorData;