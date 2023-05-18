import React, { useState,useEffect } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import Blogger from "./Blogger";
import axios from "axios";
const Users = () => {

  const [users,setUsers]=useState([]);

  useEffect( () => {
    axios
       .get(`http://localhost:3000/users`, {headers: {
        'Authorization': localStorage.getItem("token") 
      }})
       .then((response) => {
          setUsers(response.data);
          console.log("here we are",response.data)
       })
       .catch((err) => {
          console.log(err);
       });
 }, []);

  return (
    <div>
      <h1 className="text-center mt-4">Alpha-Bloggers</h1>
      <div className="container">
        <div className="text-center">
            {users.map((user) => (
              <Blogger props={user} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default Users;
