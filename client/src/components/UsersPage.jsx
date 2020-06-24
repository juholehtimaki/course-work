import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { UserForm } from "./UserForm.jsx";

export const UsersPage = () => {
  const auth = useSelector(state => state.auth);
  const [users, setUsers] = useState();

  useEffect(() => {
    if (!users) {
      fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: "Bearer " + auth.token
        }
      })
        .then(response => response.json())
        .then(data => {
          setUsers(data.users);
        });
    }
  });

  if (auth.role === "admin") {
    return (
      <div>
        <h1>Users:</h1>
        {users
          ? users.map((user, index) => {
              return (
                <div className="card my-3 p-3" key={index}>
                  <UserForm formData={user} />
                </div>
              );
            })
          : null}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};
