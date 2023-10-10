import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";

const Registerscreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  const empty = {
    username: "",
    email: "",
    password: "",
    phonenumber: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, phonenumber } = user;
    const newUser = {
      username,
      email,
      password,
      phonenumber,
    };
    try {
      setLoading(true);
      const result = (await axios.post("/register", newUser)).data;
      setLoading(false);
      setSuccess(true);
      setUser(empty);

      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        {error && <Error />}
        {success && <Success message="Registration Successfull" />}
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-3">
            <div
              className="card text-white"
              style={{ borderRadius: "1rem", backgroundColor: "black" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-1 pb-5">
                  <h2 className="fw-bold mb-3 text-uppercase">Register</h2>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="Name"
                      className="form-control form-control-lg"
                      value={user.username}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      required
                    />
                    <label className="form-label" htmlFor="Name">
                      Name
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="number"
                      id="Phonenumber"
                      className="form-control form-control-lg"
                      value={user.phonenumber}
                      onChange={(e) =>
                        setUser({ ...user, phonenumber: e.target.value })
                      }
                      required
                      minLength={10}
                      maxLength={10}
                      onInput={(e) => {
                        if (e.target.value.length > 10) {
                          e.target.value = e.target.value.slice(0, 10);
                        }
                      }}
                    />
                    <label className="form-label" htmlFor="Phonenumber">
                      Phone Number (10 digits)
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="Email"
                      className="form-control form-control-lg"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      required
                    />
                    <label className="form-label" htmlFor="Email">
                      Email
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="Password"
                      className="form-control form-control-lg"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      required
                    />
                    <label className="form-label" htmlFor="Password">
                      Password
                    </label>
                  </div>
                  <button
                    className="btn btn-outline-light btn-lg px-3"
                    onClick={handleSubmit}
                  >
                    Create My Account
                  </button>
                </div>
                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white-50 fw-bold">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registerscreen;
