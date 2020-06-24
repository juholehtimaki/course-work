import React from "react";
import { Link } from "react-router-dom";

export const ListedItem = props => {
  return (
    <div className="card">
      <h3>Item's name: {props.iteminfo.name}</h3>
      <h4>Item's price: {props.iteminfo.price * props.iteminfo.margin}</h4>
      <p>Item's description: {props.iteminfo.description}</p>
      {props.allowBuy === true && (
        <Link to={"/market/" + props.iteminfo._id}>
          <button>Buy</button>
        </Link>
      )}
    </div>
  );
};
