import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import Card from "../Card/Card";
import Study from "../Study/Study";
import CreateDeck from "../Deck/CreateDeck/CreateDeck";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api/index";
import AddCard from "../Card/AddCard/AddCard";

function Deck({ decks, setDecks }) {
    
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    const [ deck, setDeck ] = useState(undefined);
    //const [ cards, setCards ] = useState(undefined);

    useEffect(() => {
        console.log("triggering get deck...")
        async function getDeck(id) {
            
            const deck = await readDeck(id);
            //console.log(deck);
            setDeck(deck);
        }
        getDeck(deckId);
    }, [])

    function deleteHandler(id) {
        if (window.confirm("Delete this deck?")) {
            let purgedDeck = decks.filter(deck => deck.id !== id);
            setDecks(purgedDeck);
            deleteDeck(id);
        }
    }

    async function cardDeleteHandler(cardId) {
        if (window.confirm("Delete Card?")) {
            const newCards = deck.cards.filter(card => card.id !== cardId);
            const newDeck = {
                ...deck,
                cards: newCards
            }
            const del = await deleteCard(cardId);
            setDeck(newDeck);
        }
        
    }
    
    let content = deck ?
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
            </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p className="my-4">{deck.description}</p>
        <div className="my-4">
            <Link to={`${url}/edit`} type="button" className="btn btn-secondary mr-2">Edit</Link>
            <Link to={`${url}/study`} type="button" className="btn btn-primary mr-2">Study</Link>
            <Link to={`${url}/cards/new`} type="button" className="btn btn-primary">+ Add Cards</Link>
            <button onClick={() => deleteHandler(deck.id)} type="button" className="btn btn-danger" style={{float: "right"}}>Delete</button>
        </div>
        <h2>Cards</h2>
        {deck.cards.map(card => {
            return (
                <Card key={card.id} front={card.front} back={card.back} id={card.id} deckId={card.deckId} cardDelete={() => cardDeleteHandler(card.id)}/>
            )
        })}
    </div> : ""
    

    return (
        <>
            <Switch>
                <Route exact path={`${url}`}>
                    {content}
                </Route>
                <Route path={`/decks/:deckId/study`}>
                    <Study />
                </Route>
                <Route path={`${url}/edit`}>
                    <CreateDeck id={deck ? deck.id : ""} edit={true} />
                </Route>
                <Route path={`${url}/cards/new`}>
                    <AddCard deckId={deck ? deck.id : ""} edit={false} setParentDeck={setDeck} decks={decks} setDecks={setDecks} />
                </Route>
                <Route path={`${url}/cards/:cardId/edit`}>
                    <AddCard deckId={deck ? deck.id : ""} edit={true} setParentDeck={setDeck}/>
                </Route>
            </Switch>
        </>
    )
}

export default Deck;