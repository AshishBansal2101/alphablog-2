import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";

const Signup = (props) => {

  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    axios.post("http://localhost:3000/users",{
      user:{
        username: state.username,
        email: state.email,
        password: state.password,
      },
     
    },
    { withCredentials: true}
    ).then(response=>{
      if(response.data.status==="created"){
        props.handleSuccessfulAuth(response.data);
      }
      console.log("registration res" , response);
    })
    .catch(error => {
      console.log("registration error", error);
    });
    event.preventDefault();
    console.log(state);
  };

  return (
    <div>
    <h1 className="text-center mt-4 m-4">Sign Up For Alpha-Blog</h1>
      <div className="container m-5">
        <div className="row justify-content-center">
          <div className="col-10">
            <form className="shadow p-3 mb-3 bg-info rounded lgn" onSubmit={handleSubmit}>
              <div className="form-group row">
                <label className="col-2 col-form-label text-light">
                  username
                </label>
                <div className="col-10">
                  <input
                    type="text"
                    name="username"
                    value={state.username}
                    onChange={handleInputChange}
                    className="form-control shadow rounded"
                    placeholder="Enter A Username"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-2 col-form-label text-light">email</label>
                <div className="col-10">
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
                <div className="col-10">
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

              <div className="form-group-row row justify-content-center">
                <input type="submit" className="btn btn-outline-light btn-lg" />
              </div>
            </form>
          </div>
          <div className="mb-3">
            <Link to="/login" className="text-white m-3">
              '[ Cancel and Return To Login ]'
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
