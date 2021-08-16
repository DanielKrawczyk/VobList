import React, { useState, useEffect } from 'react';
import Vob from './Vob';

function List(props) {
    const [ state, setState ] = useState(props.data);

    useEffect(() => {
            setState(props.data)
        },
        [props.data]
    );

    return (
        <div className="list">
            <div className="list-search">
                <h1><i className="bi bi-search"></i></h1>
                <input type="text" onChange={el => {
                    setState(props.data.filter(f => f.title.includes(el.currentTarget.value) || f.code.includes(el.currentTarget.value)));
                }} />
            </div>
            <div className="list-count">
                <p>Liczba pozycji: {state.length}</p>
            </div>
            <div className="list-vobs">
                {state.map(m => {
                    return (
                        <Vob key={m.code} data={m} />
                    )
                })}
            </div>
        </div>
    )
}

export default List;