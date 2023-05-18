import React from "react";
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../AuthContext";
import { Link ,useParams} from "react-router-dom";
import Blogger from "./Blogger";
import Article from "../articles/Article";
const Profile = () => {
  
  const [profile, setProfile] = useState();
  const [articles, setArticles] = useState();
  const {id}=useParams();
  const {user}=useContext(AuthContext);
  useEffect(()=>{
  axios
       .get(`http://localhost:3000/users/${id}`, {headers: {
        'Authorization': localStorage.getItem("token") 
      }})
       .then((response) => {
          setProfile(response.data);
          console.log("profile",response.data);
       })
       .catch((err) => {
          console.log(err);
       });
     

 }, []);

  return (
    <div>
    <Blogger props={profile}/>
     
    {profile?.articles.map((article) => (
    <>
     <Article id={article.id}/>
    </>
    ))}



    </div>
  )
}

export default Profile