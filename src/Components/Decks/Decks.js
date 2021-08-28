import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Deck from "../Deck/Deck";
import Study from "../Study/Study";
import { deleteDeck } from "../../utils/api/index";
function Decks({ decks, setDecks }) {

    const { url } = useRouteMatch();


    function deleteHandler(id) {
        if (window.confirm("Delete this deck?")) {
            let purgedDeck = decks.filter(deck => deck.id !== id);
            setDecks(purgedDeck);
            deleteDeck(id);
        }
        
    }

    let content;
    decks ? content = decks.map(deck => {
        return (
            <div className="card p-4" key={deck.id}>
                <div>
                    <h4>{deck.name}</h4>
                    <p style={{position:"absolute", top: "15px", right: "20px"}}>{deck.cards.length} cards</p>
                </div>
                <p className="my-4">{deck.description}</p>
                <div>
                    <Link to={`decks/${deck.id}`} type="button" className="btn btn-secondary mr-1">View</Link>
                    <Link to={`decks/${deck.id}/study`} type="button" className="btn btn-primary">Study</Link>
                    <button onClick={() => deleteHandler(deck.id)} type="button" className="btn btn-danger" style={{float: "right"}}>Delete</button>
                </div>
            </div>
        )
    }) : content = "";

    return (
        <>
            <Switch>
                <Route path={`decks/:deckId`}>
                    <Deck decks={decks} />
                </Route>
                <Route path={`decks/:deckId/study`}>
                    <Study />
                </Route>
            </Switch>
            {content}
        </>
        
    )
}

export default Decks;