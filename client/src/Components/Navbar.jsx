import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const logout =()=>{
    localStorage.removeItem("currentUser");
    navigate('/login')
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">
            Wonder Rooms
          </a>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ backgroundColor: "white" }}
          >
            <span
              className="navbar-toggler-icon"
              style={{ backgroundColor: "white" }}
            />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <div className="dropdown me-3">
                    <button
                      className="btn text-light"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/bookings">
                          Bookings
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" onClick={logout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/login">
                      LogIn
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
