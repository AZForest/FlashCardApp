import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createDeck, listDecks, readDeck, updateDeck } from '../../../utils/api/index';

function CreateDeck({ decks, setDecks, setParentDeck, edit, id }) {

    const history = useHistory();
    
    const initialDeck = {
        id: 0,
        name: "",
        description: ""
    }
    const [ deck, setDeck ] = useState(initialDeck);

    useEffect(() => {
        if (!edit) {
            let newId = Math.floor(Math.random() * 100);
            while (decks.find(deck => deck.id === newId)) {
                newId = Math.floor(Math.random() * 100);
            }
            setDeck({ ...deck, id: newId })
        } else {
            async function getDeck(id) {
                const dbDeck = await readDeck(id);
                setDeck(dbDeck);
            }
            getDeck(id);
        }
    },[])

    

    function changeHandler(string) {
        if (string === "name") {
            const inputName = document.querySelector("#name").value;
            const newDeck = {
                ...deck,
                name: inputName
            }
            setDeck(newDeck);
        } else {
            const desc = document.querySelector("#description").value;
            const newDeck = {
                ...deck,
                description: desc
            }
            setDeck(newDeck);
        }
    }
    async function submitHandler() {
        if (!edit) {
            if (validateInputs()) {
                const results = await createDeck(deck);
                const list = await listDecks();
                const newDecks = await setDecks(list);
                history.push(`/decks/${deck.id}`);
            } else {
                window.alert("Inputs cannot be empty");
            }
        } else {
            if (validateInputs()) {
                const results = await updateDeck(deck);
                const list = await listDecks();
                const newDecks = await setDecks(list);
                const newDeck = await setParentDeck(deck);
                history.push(`/decks/${deck.id}`);
            } else {
                window.alert("Inputs cannot be empty");
            }
        }
        
    }

    function validateInputs() {
        return deck.name.trim().length > 0 && deck.description.trim().length > 0;
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{edit ? <p className="m-0 p-0">Edit Deck</p> : <p className="m-0 p-0">Create Deck</p>}</li>
                </ol>
            </nav>
            {edit ? <h1>Edit Deck</h1> : <h1>Create Deck</h1>}
            <form>
                <label htmlFor="name">
                    Name
                    <br />
                    <input onChange={() => changeHandler("name")}
                           type="text" 
                           id="name" 
                           placeholder="Deck Name" 
                           style={{width: "400px"}}
                           value={deck.name}></input>
                </label>
                <br />
                <label htmlFor="description">
                    Description
                    <br />
                    <textarea onChange={() => changeHandler("desc")}
                              type="text" 
                              id="description" 
                              placeholder="Brief Description" 
                              style={{height: "100px", width: "400px"}}
                              value={deck.description}></textarea>
                </label>
                <div>
                    <button onClick={() => history.goBack()} type="button" className="btn btn-secondary mr-2">Cancel</button>
                    <button onClick={() => submitHandler()} type="button" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;