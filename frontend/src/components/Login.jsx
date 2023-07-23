import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [inpcolor, setInpcolor] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.UserData);
  useEffect(() => {
    console.log("Auth State:", selector);
  }, [selector]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {email, password};
    axios
      .post("/api/user/login", payload)
      .then((response) => {
        //jwt token store in local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        dispatch(login(response.data));
        setLoading(false);
        navigate("/home");

        // add login response in redux
      })
      .catch((err) => {
        setInpcolor(true);
        setLoading(false);
        setError(err.response.data.error);
      });
  };
  return (
    <div id="login_div">
      <form className="form" onSubmit={handleSubmit}>
        <div className="header">Log In</div>
        <div className="inputs">
          <input
            placeholder="Email"
            className="input"
            style={inpcolor ? {border: "1px solid red"} : {}}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
              setInpcolor(false);
            }}
          />
          <input
            placeholder="Password"
            className="input"
            style={inpcolor ? {border: "1px solid red"} : {}}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
              setInpcolor(false);
            }}
          />
          <button disabled={loading} className="sigin-btn">
            Login
          </button>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
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
  );
};

export default Login;
