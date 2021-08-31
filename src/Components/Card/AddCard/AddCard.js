import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, listDecks, readCard, readDeck, updateCard } from "../../../utils/api";
import FormComponent from "../../FormComponent/FormComponent";

function AddCard({ deckId, setParentDeck, setDecks }) {

    const initialCard = {
        id: 0,
        front: "",
        back: "",
        deckId: deckId
    }

    const history = useHistory();
    const [ deck, setDeck ] = useState(null);
    const [ card, setCard ] = useState(initialCard);
    useEffect(() => {
        async function getDeck(id) {
            const dbDeck = await readDeck(id);
            setDeck(dbDeck);

            let newId = Math.floor(Math.random() * 1000);
            while (dbDeck.cards.find(card => card.id === newId)) {
                newId = Math.floor(Math.random() * 1000);
            }
            setCard({ ...card, id: newId })

        }
        getDeck(deckId);

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
            const z = await createCard(deckId, card);
            const newDeck = await readDeck(deckId);
            const parent = await setParentDeck(newDeck);
            const grandParent = await listDecks();
            setDecks(grandParent);
            setCard(initialCard);
        } else {
            window.alert("Text boxes cannot be empty");
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
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`} >{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <h2>{deck.name}: Add Card</h2>
        <FormComponent card={card}
                       frontChangeHandler={frontChangeHandler}
                       backChangeHandler={backChangeHandler}
                       submitHandler={submitHandler} />
    </div> : ""
    return (
        <div>
            {content}
        </div>
    )
}

export default AddCard;