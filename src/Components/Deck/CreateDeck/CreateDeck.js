import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { createDeck, listDecks, readDeck, updateDeck } from '../../../utils/api/index';

function CreateDeck({ decks, setDecks, edit, id }) {

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
            //console.log(inputName);
            const newDeck = {
                ...deck,
                name: inputName
            }
            setDeck(newDeck);
        } else {
            const desc = document.querySelector("#description").value;
            //console.log(desc);
            const newDeck = {
                ...deck,
                description: desc
            }
            setDeck(newDeck);
        }
    }
    async function submitHandler() {
        if (!edit) {
            console.log(decks);
            const results = await createDeck(deck);
            const list = await listDecks();
            console.log(list);
            const x = await setDecks(list);
            console.log(decks);
            history.replace(`/deck/${deck.id}`);
        } else {
            const results = await updateDeck(deck);
            history.push(`/deck/${deck.id}`);
        }
        
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