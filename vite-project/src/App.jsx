import { useState } from "react";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import Navigation from "./components/layouts/Navigation.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Users from "./components/users/Users.jsx";
import Articles from "./components/articles/Articles.jsx";
import Signup from "./components/users/Signup.jsx";
import Login from "./components/sessions/Login.jsx";
import NewArticle from "./components/articles/NewArticle.jsx";
import "./App.scss";

function App() {
  const [state, setState] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  })

  return (
    <>
      <body className="d-flex flex-column">
        <div id="page-content">
          <BrowserRouter>
            {/* <Navigation /> */}
            <Routes>
              <Route path={"/"}
               render={props=>(
                <Home {...props} loggedInStatus={10}/>
               )}

                />
              {/* <Route exact path ={"/"} render ={props =>(
                 <Home {...props} loggedInStatus={state.loggedInStatus}/>
              )}/> */}
              {/* <Route exact path="/" element={<Home loggedInStatus={state.loggedInStatus} />} /> */}
              <Route
                path="/"
                element={<Home loggedInStatus={state.loggedInStatus} />}
                render={(props) => <Home {...props} loggedInStatus={state.loggedInStatus} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/articles" element={<Articles />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/newarticle" element={<NewArticle />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </body>
    </>
  );
}

export default App;
