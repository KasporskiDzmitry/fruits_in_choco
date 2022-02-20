import React, {useEffect} from "react";
import {Tab, Tabs} from "react-bootstrap";
import BiscuitsTable from "./BiscuitsTable";
import FillingsTable from "./FillingsTable";
import DecorationsTable from "./DecorationsTable";
import {useDispatch, useSelector} from "react-redux";
import {loadData} from "../../../redux/thunks/cakeConstructor_thunks";

const CakeConstructorData = (props) => {
    const data = useSelector(state => state.cakeConstructorReducer.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadData())
    }, [])

    return <div>
        <Tabs defaultActiveKey="biscuits" id="cakeConstructorTable" className="mb-2">
            <Tab eventKey="biscuits" title="Бисквиты">
                <BiscuitsTable data={data.biscuits}/>
            </Tab>
            <Tab eventKey="fillings" title="Начинки">
                <FillingsTable data={data.fillings}/>
            </Tab>
            <Tab eventKey="decorations" title="Украшения">
                <DecorationsTable data={data.decorations}/>
            </Tab>
        </Tabs>
    </div>
}

export default CakeConstructorData;