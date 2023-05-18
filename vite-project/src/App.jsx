import { useState, useEffect } from "react";
import React, { Component, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import Navigation from "./components/layouts/Navigation.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Users from "./components/users/Users.jsx";
import Articles from "./components/articles/Articles.jsx";
import Profile from "./components/users/Profile.jsx";
import Article from "./components/articles/Article.jsx";
import Signup from "./components/users/Signup.jsx";
import Login from "./components/sessions/Login.jsx";
import { AuthProvider } from './AuthContext';
import { AuthContext } from './AuthContext';
import NewArticle from "./components/articles/NewArticle.jsx";
import "./App.scss";

function App() {

  return (
    <>
    
      <body className="d-flex flex-column">
        <div id="page-content">
        <AuthProvider>
          <BrowserRouter>
            <Navigation/>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/articles" element={<Articles />} />
              <Route exact path="/article/:id" element={<Article />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/newarticle" element={<NewArticle />} />
              <Route exact path="/viewprofile/:id" element={<Profile />} />
            </Routes>
          </BrowserRouter>
          </AuthProvider>
          <Footer />
        </div>
      </body>
    </>
  );
}

export default App;
