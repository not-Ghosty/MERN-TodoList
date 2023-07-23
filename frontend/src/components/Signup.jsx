import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {login} from "../store/AuthSlice";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const selector = useSelector((state) => state.UserData);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Auth State:", selector);
  }, [selector]);

  const handleSubmit = (e) => {
    const payload = {email, password};
    e.preventDefault();
    setLoading(true);
    setError(null);
    axios
      .post(`/api/user/signup`, payload)
      .then((response) => {
        //save jwt in local storage
        localStorage.setItem("user", JSON.stringify(response.data));
        //update redux
        dispatch(login(response.data));
        setLoading(false);
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.error);
      });
  };
  return (
    <div>
      <div id="login_div">
        <form
          className="form"
          style={{borderLeft: "5px solid rgb(30, 136, 229)"}}
          onSubmit={handleSubmit}
        >
          <div
            className="header"
            style={{backgroundColor: "rgb(30, 136, 229)"}}
          >
            Sign Up
          </div>
          <div className="inputs">
            <input
              placeholder="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
            />
            <input
              placeholder="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
            />
            <button
              className="sigin-btn"
              disabled={loading}
              style={{backgroundColor: "rgb(30, 136, 229)"}}
            >
              Sign Up
            </button>
            {error && (
              <div
                style={{color: "red", border: "1px solid red", padding: "6px"}}
              >
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
