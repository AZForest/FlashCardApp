import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, listDecks, readCard, readDeck, updateCard } from "../../../utils/api";

function AddCard({ edit, deckId, setParentDeck, setDecks }) {

    const initialCard = {
        id: 0,
        front: "",
        back: "",
        deckId: deckId
    }

    const { cardId } = useParams();
    const history = useHistory();
    const [ deck, setDeck ] = useState(null);
    const [ card, setCard ] = useState(initialCard);
    useEffect(() => {
        async function getDeck(id) {
            console.log(typeof deckId);
            const dbDeck = await readDeck(id);
            console.log(dbDeck.cards);
            if (!edit) {
                let newId = Math.floor(Math.random() * 1000);
                while (dbDeck.cards.find(card => card.id === newId)) {
                    newId = Math.floor(Math.random() * 1000);
                }
                setCard({ ...card, id: newId })
            } else {
                const dbCard = await readCard(cardId);
                setCard(dbCard);
            }
            setDeck(dbDeck);
        }
        getDeck(deckId);

    }, [])

    function changeHandler(string) {
        if (string === "front") {
            const inputName = document.querySelector("#front").value;
            console.log(inputName);
            const newCard = {
                ...card,
                front: inputName
            }
            setCard(newCard);
        } else {
            const desc = document.querySelector("#back").value;
            console.log(desc);
            const newCard = {
                ...card,
                back: desc
            }
            setCard(newCard);
        }
    }

    async function submitHandler() {
        if (!edit) {
            console.log(card);
            const z = await createCard(deckId, card);
            const newDeck = await readDeck(deckId);
            const parent = await setParentDeck(newDeck);
            const grandParent = await listDecks();
            setDecks(grandParent);
            setCard(initialCard);
        } else {
            const upadate = await updateCard(card);
            const newDeck = await readDeck(deckId);
            const parent = await setParentDeck(newDeck);
            history.push(`/decks/${deckId}`);
        }
    }

    let content = deck ?
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`} >{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{edit ? <p className="m-0 p-0">Edit Card</p> : <p className="m-0 p-0">Add Card</p>}</li>
            </ol>
        </nav>
        {!edit ? <h2>{deck.name}: Add Card</h2> : <h2>{deck.name}: Edit Card</h2>}
        <form>
                <label htmlFor="front">
                    Name
                    <br />
                    <textarea onChange={() => changeHandler("front")}
                           type="text" 
                           id="front" 
                           placeholder="Front side of card" 
                           style={{width: "400px"}}
                           style={{height: "100px", width: "400px"}}
                           value={card.front}></textarea>
                </label>
                <br />
                <label htmlFor="back">
                    Description
                    <br />
                    <textarea onChange={() => changeHandler("back")}
                              type="text" 
                              id="back" 
                              placeholder="Back side of card" 
                              style={{height: "100px", width: "400px"}}
                              value={card.back}></textarea>
                </label>
                <div>
                    <button onClick={() => history.goBack()} type="button" className="btn btn-secondary mr-2">Done</button>
                    <button onClick={() => submitHandler()} type="button" className="btn btn-primary">Save</button>
                </div>
        </form>
    </div> : ""
    return (
        <div>
            {content}
        </div>
    )
}

export default AddCard;