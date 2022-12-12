import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
const Navbar = () => {
  const [online, setOnline] = useState(true);
  const goOnline = () => {
    setOnline(true);
  };

  const goOffline = () => {
    setOnline(false);
  };

  useEffect(() => {
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, [online]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about-me">
                  About me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contact-me">
                  Contact me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="albums">
                  Albums
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        {!online && (
          <div class="alert alert-warning" role="alert">
            Oops! you are offline baby!
          </div>
        )}
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
