import React, { useState, useEffect, useRouteMatch } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route, Link } from "react-router-dom";
import Decks from "../Components/Decks/Decks";
import Deck from "../Components/Deck/Deck";
import { listDecks } from "../utils/api/index";
import CreateDeck from "../Components/Deck/CreateDeck/CreateDeck";

function Layout() {

  const [ decks, setDecks ] = useState([]);

  useEffect(() => {
        async function getDecks() {
          const dbDecks = await listDecks();
          setDecks(dbDecks);
        }
        getDecks();
  }, [])

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new" type="button" className="btn btn-secondary mb-2">+ Create Deck</Link>
            <Decks decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks} edit={false} id={null} />
          </Route>
          <Route path="/decks/:deckId">
            <Deck decks={decks} setDecks={setDecks}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </>
  );
}

export default Layout;
