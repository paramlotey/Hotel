import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Loginscreen = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    console.log('Submitted:', user);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-3">
          <div className="card text-white" style={{ borderRadius: '1rem', backgroundColor: 'black' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-1 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>
                
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="Email"
                      className="form-control form-control-lg"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      required
                    />
                    <label className="form-label" htmlFor="Password">
                      Password
                    </label>
                  </div>
                  <button className="btn btn-outline-light btn-lg px-3" onClick={handleSubmit}>
                    Login
                  </button>
                
              </div>
              <div>
                <p className="mb-0">
                  Don't have an account? <Link to='/register' className="text-white-50 fw-bold">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
