import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <h1 class="text-center m-5">Login For Alpha-Blog</h1>

      <div class="container m-5">
        <div class="row justify-content-center">
          <div class="col-10">
            <form className="shadow p-3 mb-3 bg-info rounded lgn">
              <div class="form-group row">
                <label className="col-2 col-form-label text-light">email</label>
                <div class="col-10">
                  <input
                    type="email"
                    name="email"
                    className="form-control shadow rounded"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label className="col-2 col-form-label text-light">
                  Password
                </label>
                <div class="col-10">
                  <input
                    type="password"
                    name="email"
                    className="form-control shadow rounded"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>

              <div class="form-group-row row justify-content-center m-2">
                <input type="submit" class="btn btn-outline-light btn-lg" />
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
