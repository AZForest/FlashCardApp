import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from '../../../utils/api';
import FormComponent  from '../../FormComponent/FormComponent';

function EditCard({ deckId, setParentDeck }) {

    const { cardId } = useParams();
    const history = useHistory();
    const [ card, setCard ] = useState(null);
    const [ deck, setDeck ] = useState(null);
    useEffect(() => {
        async function getDeck(id) {
            const dbDeck = await readDeck(id);
            setDeck(dbDeck);
        }
        getDeck(deckId);

        async function getCard(id) {
            const dbCard = await readCard(id);
            setCard(dbCard);
        }
        getCard(cardId);

    }, [])

    function frontChangeHandler() {
        const inputName = document.querySelector("#front").value;
        const newCard = {
            ...card,
            front: inputName
        }
        setCard(newCard);
    }

    function backChangeHandler() {
        const desc = document.querySelector("#back").value;
        const newCard = {
            ...card,
            back: desc
        }
        setCard(newCard);
    }

    async function submitHandler() {
        if (validateInputs()) {
            const update = await updateCard(card);
            const newDeck = await readDeck(deckId);
            const parent = await setParentDeck(newDeck);
            history.push(`/decks/${deckId}`);
        } else {
            window.alert("Texts boxes cannot be empty");
        }
        
    }

    function validateInputs() {
        return card.front.trim().length > 0 && card.back.trim().length > 0;
    }

    let content = deck ?
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Edit Card</h2>
            {card ? <FormComponent card={card} 
                           frontChangeHandler={frontChangeHandler}
                           backChangeHandler={backChangeHandler}
                           submitHandler={submitHandler}/> : ""}
        </div> : ""

    return (
        <div>
            {content}
        </div>
    )
}

export default EditCard;