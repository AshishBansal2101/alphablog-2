import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../AuthContext';

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log('nav', isLoggedIn)

  // useEffect(() => {
  //   const token=localStorage.getItem("token");
  //   const user=localStorage.getItem("user");
  //   if(token && user){
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  
  const {user}=useContext(AuthContext);
  const current_user = { admin: true, username: "Ashish" };
  const logOutUser=(e)=> {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
    // window.history.back();
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" id="logo" href="/">
          Alpha blog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    Bloggers
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Articles
                  </a>

                  <div className="dropdown-menu">
                    <Link to="/newarticle" className="dropdown-item">
                      Create New Article
                    </Link>
                    <Link to="/articles" className="dropdown-item">
                      View Articles
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Categories
                  </a>

                  {current_user.admin && (
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/newcategory" className="dropdown-item">
                        Create New Category
                      </Link>
                      <Link to="/viewcategory" className="dropdown-item">
                        View Categories
                      </Link>
                    </div>
                  )}
                </li>

                <li className="nav-item">
                  <Link  className="nav-link" onClick={logOutUser}>
                    Logout
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {current_user.admin && <span>"(Admin)"</span>}{" "}
                    {current_user.username}
                  </a>
                  <div className="dropdown-menu">
                    <Link to={`/viewprofile/${user.id}`} className="dropdown-item">
                      View Your Profile
                    </Link>
                    <Link to="/editprofile" className="dropdown-item">
                      Edit Your Profile
                    </Link>
                    <Link to="/deleteprofile" className="dropdown-item">
                      Delete Your Profile
                    </Link>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  {/* <%= link_to 'Login', login_path, class:"nav-link" %> */}
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                  {/* <%= link_to 'Signup', signup_path, class:"nav-link" %> */}
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
