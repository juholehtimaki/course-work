import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ConfirmationPage = () => {
  const [item, setItem] = useState();
  const [itemBought, setItemBought] = useState(false);
  const [owner, setOwner] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  let { id } = useParams();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!item) {
      fetch(`http://localhost:5000/api/items/${id}`, {
        headers: {
          Authorization: "Bearer " + auth.token
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setItem(data);
          console.log(data);
        });
    }
  }, [item, id, auth]);

  const pay = e => {
    e.preventDefault();
    fetch(item.item.links[0].self, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token
      },
      body: JSON.stringify({ status: "sold" })
    })
      .then(result => setItemBought(true))
      .catch(e => console.log(e));
  };

  if (auth.role) {
    if (!itemBought) {
      return (
        <div>
          {item ? (
            <>
              <h1>Confirmation page for item: {item.item.name}</h1>
              <h2>Description: {item.item.description}</h2>
              <h3>Price: {item.item.price * item.item.margin}</h3>
              <form onSubmit={pay}>
                <div className="form-group">
                  <label>Owner</label>
                  <input
                    className="form-control"
                    value={owner}
                    onChange={e => setOwner(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Card number</label>
                  <input
                    className="form-control"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary my-3">
                  Pay
                </button>
              </form>
            </>
          ) : (
            <>
              <p>Couldnt find item</p>
            </>
          )}
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/" />;
  }
};
