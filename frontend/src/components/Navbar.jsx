import React from "react";
import "../global.css";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/AuthSlice";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const selector = useSelector((state) => state.UserData);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  let user = selector.user;
  const logoutClick = () => {
    // remove jwt from local storage
    localStorage.removeItem("user");
    //remove from redux
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div id="logo">
        {user && location.pathname.includes("/edit") ? (
          <Link to="/home">
            <button className="custom-btn btn">
              <span>Home</span>
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div id="gap">
        <h3>
          {" "}
          <Link className="centre_logo" to="/" style={{textDecoration: "none"}}>
            <span> Pradeep'S TODO list</span>
          </Link>
        </h3>
      </div>
      {location.pathname !== "/login" && !user ? (
        <div id="login">
          <Link to="/login">
            <button className="custom-btn btn">
              <span>Login</span>
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      {user && (
        <div id="login">
          <span>{user.email}</span>
          <Link to="/login">
            <button onClick={logoutClick} className="custom-btn btn">
              <span>Logout</span>
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
