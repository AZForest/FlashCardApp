import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';

function NotEnoughCards({ deck }) {

    const { url } = useRouteMatch();
    const { deckId } = useParams();


    return (
        <div>
            <h3>Not Enough Cards.</h3>
            <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} type="button" className="btn btn-primary">+ Add Cards</Link>
        </div>
    )
}

export default NotEnoughCards;