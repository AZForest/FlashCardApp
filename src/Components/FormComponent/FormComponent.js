import React from "react";
import { useHistory } from "react-router-dom";

function FormComponent({ card, frontChangeHandler, backChangeHandler, submitHandler }) {

    const history = useHistory();

    return (
        <div>
            <form>
                <label htmlFor="front">
                    Name
                    <br />
                    <textarea onChange={() => frontChangeHandler()}
                           type="text" 
                           id="front" 
                           placeholder="Front side of card" 
                           style={{width: "400px"}}
                           style={{height: "100px", width: "400px"}}
                           value={card.front}
                           required></textarea>
                </label>
                <br />
                <label htmlFor="back">
                    Description
                    <br />
                    <textarea onChange={() => backChangeHandler()}
                              type="text" 
                              id="back" 
                              placeholder="Back side of card" 
                              style={{height: "100px", width: "400px"}}
                              value={card.back}
                              required></textarea>
                </label>
                <div>
                    <button onClick={() => history.goBack()} type="button" className="btn btn-secondary mr-2">Done</button>
                    <button onClick={() => submitHandler()} type="button" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent;