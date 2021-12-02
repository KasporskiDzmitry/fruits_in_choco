import React, {useState} from 'react';
import style from './Table.module.scss';
import Pagination from "../Pagination/Pagination";

const Table = (props) => {
    const [sortBy, setSortBy] = useState('');
    const [filterColumn, setFilterColumn] = useState('');
    const [isAscSort, setIsAscSort] = useState(true);

    const refs = {
        // id: useRef(null),
        // firstName: useRef(null),
        // lastName: useRef(null),
        // email: useRef(null),
        // phone: useRef(null),
        // state: useRef(null)
    };

    const filter = (column) => {
        setFilterColumn(column);
        const regExp = new RegExp(column, 'i');
        props.setDataToShow(props.data.filter(i => {
            for (let prop in i) {
                if (i[prop].toString().match(regExp)) {
                    return true;
                }
            }
        }));
        props.setCurrentPage(0);
    };

    const sort = (sortBy) => {
        setSortBy(sortBy);
        const sortedData = props.dataToShow.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0;
        });

        return !isAscSort ?
            props.setDataToShow(sortedData) :
            props.setDataToShow(sortedData.reverse());
    };

    const chooseItem = (item) => {

    }

    return <div className={style.wrapper}>
        <div className={style.tableControlsWrapper}>
            <div className={style.filter}>
                <div>
                    <input type="text" placeholder='Search by name' value={filterColumn}
                           onChange={(e) => filter(e.target.value)}/>
                </div>
            </div>
            {/*<Pagination data={filterColumn === '' ? props.data : props.dataToShow}*/}
            {/*            currentPage={props.currentPage} controlsNumber={3} itemsPerPage={10}*/}
            {/*            onPageChange={props.setCurrentPage}/>*/}
        </div>
        <div className={style.tableWrapper}>
            <table className={props.data.length === 0 ? style.loading : undefined}>
                <thead>
                <tr>
                    {
                        Object.keys(props.names).map(i => <td key={i.toString()} ref={refs[i]} onClick={() => {
                            setIsAscSort(!isAscSort);
                            sort(i)
                        }}>{props.names[i]} {sortBy === i ? isAscSort ? <span>&#8593;</span> :
                            <span>&#8595;</span> : ''}</td>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    props.dataToShow
                        .slice(props.currentPage * 10, props.currentPage * 10 + 10)
                        .map((i, idx) => {
                            return <tr key={i.id} className={idx % 2 === 0 ? style.odd : undefined} onClick={() => chooseItem(i)}>
                                {
                                    Object.keys(props.names).map(prop => <td key={prop.toString()}>{i[prop]}</td>)
                                }
                            </tr>
                        })
                }
                </tbody>
            </table>
        </div>
    </div>
};

export default Table;