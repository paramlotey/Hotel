import React from "react";

const Navbar = () => {
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
              <li className="nav-item">
                <a className="nav-link text-light" href="#">
                  LogIn
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">
                  SignUp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
