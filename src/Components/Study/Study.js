import React, { useEffect, useState } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import StudyCard from "./StudyCard/StudyCard";
import NotEnoughCards from "./NotEnoughCards/NotEnoughCards";

function Study() {

    const [ deck, setDeck ] = useState(null);
    const { deckId } = useParams();


    useEffect(() => {
        async function getDeck(id) {
            const deckContents = await readDeck(id);
            setDeck(deckContents);
        }
        getDeck(deckId);
    }, [])

    let content;
    deck ? content = 
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`} >{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            {deck.cards.length > 2 ? <StudyCard deck={deck}/> : <NotEnoughCards deck={deck} />}
        </div> : content = ""

    return (
        <div>
            {content}
        </div>
    )
}

export default Study;