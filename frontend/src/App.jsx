import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Edit from "./components/Edit";
import Signup from "./components/Signup";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "./store/AuthSlice";

const App = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.UserData);
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      dispatch(login(localUser));
    }
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Body /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={user ? <Body /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/home" />}
          />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
