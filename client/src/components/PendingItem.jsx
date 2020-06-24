import React, { useState } from "react";
import { useSelector } from "react-redux";

export const PendingItem = props => {
  const [confirmed, setConfirmed] = useState(false);
  const [margin, setMargin] = useState(1.1);
  const auth = useSelector(state => state.auth);
  const confirmItem = () => {
    setConfirmed(true);
    fetch(props.iteminfo.links[0].self, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token
      },
      body: JSON.stringify({ status: "listed", margin: margin })
    }).catch(e => setConfirmed(false));
  };

  if (!confirmed) {
    return (
      <div className="card">
        <h3>Item's name: {props.iteminfo.name}</h3>
        <h4>Item's price: {props.iteminfo.price}</h4>
        <h4>Item's status: {props.iteminfo.status}</h4>
        <p>Item's description: {props.iteminfo.description}</p>
        <select
          id="margin"
          name="margin"
          value={margin}
          onChange={e => setMargin(e.target.value)}
        >
          <option value="1.1">1.10 margin</option>
          <option value="1.2">1.20 margin</option>
          <option value="1.3">1.30 margin</option>
        </select>
        <button onClick={confirmItem}>Confirm</button>
      </div>
    );
  } else return null;
};
