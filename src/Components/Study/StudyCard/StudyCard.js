import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';

function StudyCard({ deck }) {

    const [ front, setFront ] = useState(true);
    const [ currentCard, setCurrentCard ] = useState(null);
    const [ index, setIndex ] = useState(0);
    const history = useHistory();

    useEffect(() => {
        setCurrentCard(cards[index]);
    }, [index])

    function nextHandler() {
        if (index === cards.length - 1) {
            if (window.confirm("Restart cards?")) {
                setFront(true);
                setIndex(0);
                setCurrentCard(cards[0]);
            } else {
                history.push('/');
            }
        } else {
            setIndex(index + 1);
            setFront(true);
        }
    }

    const cards = deck.cards;

    let content;
    if (currentCard) {
        front ? content = currentCard.front : content = currentCard.back
    } else {
        content = "";
    }
    
    
    let btnStyle;
    front ? btnStyle = {display: "none"} : btnStyle={display: "inline"}
    return (
        <div className="card p-4" style={{height: "200px"}}>
            <h4>Card {index + 1} of {cards.length}</h4>
            <div>{content}</div>
            <div className="mt-3">
                <button onClick={() => setFront(!front)} type="button" className="btn btn-secondary mr-2">Flip</button>
                {!front ? <button onClick={() => nextHandler()} type="button" className="btn btn-primary"  >Next</button> : ""}
            </div>
        </div>
    )
}

export default StudyCard;