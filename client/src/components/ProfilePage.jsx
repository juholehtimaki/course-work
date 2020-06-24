import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserForm } from "./UserForm.jsx";
import { Redirect } from "react-router-dom";

export const ProfilePage = () => {
  const [formData, setFormData] = useState(null);
  const auth = useSelector(state => state.auth);
  const [boughtItems, setBoughtItems] = useState(null);
  const [listedItems, setListedItems] = useState(null);
  const [acceptedItems, setAcceptedItems] = useState(null);
  const [itemsFetched, setItemsFetched] = useState(false);

  useEffect(() => {
    if (auth.token) {
      fetch("http://localhost:5000/api/users/" + auth.id, {
        headers: {
          Authorization: "Bearer " + auth.token
        }
      })
        .then(response => response.json())
        .then(data => {
          setFormData(data.user);
        });
      if (!itemsFetched) {
        fetch("http://localhost:5000/api/items?status=me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.token
          }
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            setItemsFetched(true);
            setAcceptedItems(data.acceptedItems);
            setListedItems(data.listedItems);
            setBoughtItems(data.boughtItems);
          });
      }
    }
  }, [auth, listedItems, boughtItems, acceptedItems, itemsFetched]);

  const listBoughtItems = () => {
    if (boughtItems && boughtItems.length > 0) {
      return (
        <div className="card">
          <h1>Bought items:</h1>
          {boughtItems.map((item, key) => (
            <h4 key={key}>
              Item: {item.name}, price: {item.price}, status: {item.status}
            </h4>
          ))}
        </div>
      );
    } else return null;
  };

  const listListedItems = () => {
    if (listedItems && listedItems.length > 0) {
      return (
        <div className="card">
          <h1>Listed items:</h1>
          {listedItems.map((item, key) => (
            <h4 key={key}>
              Item: {item.name}, price: {item.price}, status: {item.status}
            </h4>
          ))}
        </div>
      );
    } else return null;
  };

  const listAcceptedItems = () => {
    if (acceptedItems && acceptedItems.length > 0) {
      return (
        <div className="card">
          <h1>Accepted items:</h1>
          {acceptedItems.map((item, key) => (
            <h4 key={key}>
              Item: {item.name}, price: {item.price}, status: {item.status}
            </h4>
          ))}
        </div>
      );
    } else return null;
  };

  if (!auth.token) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h1>Profile page</h1>
        {formData ? <UserForm formData={formData} /> : null}
        {listListedItems()}
        {listBoughtItems()}
        {listAcceptedItems()}
        <br />
      </div>
    );
  }
};
