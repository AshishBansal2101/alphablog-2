import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token,
      },
    };
    axios
      .post(
        "http://localhost:3000/login",
        {
          session: {
            email: state.email,
            password: state.password,
          },
        },
        config,
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status == "401") {
          alert("wrong credentials");
          navigate("/login");
        } else {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", (response.data.jwt));
          setIsLoggedIn(true);
          navigate("/articles");
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });

    event.preventDefault();
    // console.log(state);
  };

  return (
    <div>
      <h1 className="text-center m-5">Login For Alpha-Blog</h1>

      <div className="container m-5">
        <div className="row justify-content-center">
          <div className="col-10">
            <form
              className="shadow p-3 mb-3 bg-info rounded lgn"
              onSubmit={handleSubmit}
            >
              <div className="form-group row">
                <label className="col-2 col-form-label text-light">email</label>
                <div class="col-10">
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleInputChange}
                    className="form-control shadow rounded"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-2 col-form-label text-light">
                  Password
                </label>
                <div class="col-10">
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleInputChange}
                    className="form-control shadow rounded"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>

              <div class="form-group-row row justify-content-center m-2">
                <input type="submit" className="btn btn-outline-light btn-lg" />
              </div>
            </form>
          </div>
          <div class="mb-3">
            <Link to="/signup" className="text-white m-5">
              '[ Cancel and Return To Signup ]'
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
