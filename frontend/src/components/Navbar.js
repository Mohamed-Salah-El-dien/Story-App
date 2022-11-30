import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TfiWrite } from "react-icons/tfi";

import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Story Time</h1>
        </Link>

        {user && (
          <Link to="/write">
            <TfiWrite size={30} title="write a story" />
          </Link>
        )}

        <nav>
          {user && (
            <div className="nav">
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div className="nav">
              <button>
                <Link to="/login">Login</Link>
              </button>

              <button>
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
