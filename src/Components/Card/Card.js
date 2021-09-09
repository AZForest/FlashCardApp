import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";

function Card({ front, back, id, cardDelete }) {
    const { url } = useRouteMatch();

    return (
        <>
        <div className="card p-3">
            <div>
                <p>{front}</p>
                <p>{back}</p>
            </div>
            <div>
                <button onClick={cardDelete} type="button" className="btn btn-danger" style={{float: "right"}}>Delete</button>
                <Link to={`${url}/cards/${id}/edit`} type="button" className="btn btn-secondary mr-2" style={{float: "right"}}>Edit</Link>      
            </div>
        </div>
        </>
    )
}

export default Card;