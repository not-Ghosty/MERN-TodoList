import React, {useEffect, useState} from "react";
import "../global.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {add} from "../store/DataSlice";

const Form = ({callback}) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [valid, setValid] = useState(false);
  const [valid2, setValid2] = useState(false);

  const selector = useSelector((state) => state.APIData);
  const {user} = useSelector((state) => state.UserData);
  const dispatch = useDispatch();

  useEffect(() => {
    callback(selector);
  }, [callback, selector]);

  const handlechange = () => {
    if (title.length === 0 && (duration === "" || duration <= 0)) {
      setValid(true);
      setValid2(true);
    } else if (title.length === 0) {
      setValid(true);
    } else if (duration === 0 || duration < 0) {
      setValid2(true);
    } else {
      const payload = {title, duration};
      axios
        .post("/api/todolist", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          dispatch(add(data));
          setTitle("");
          setDuration("");
        })

        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="card">
        <p className="login">Add a New Task</p>
        <div className="inputs">
          <div className="inputBox">
            <input
              type="text"
              value={title}
              title="Enter your To-do"
              className={valid ? "error" : ""}
              onChange={(e) => {
                setTitle(e.target.value);
                setValid(false);
              }}
              required="required"
            />
            <span className="user">title</span>
          </div>
          <div className="inputBox">
            <input
              type="number"
              value={duration}
              title="Enter estimated time to finish"
              className={valid2 ? "error" : ""}
              onChange={(e) => {
                setDuration(e.target.value);
                setValid2(false);
              }}
              required="required"
            />
            <span>duration</span>
          </div>
        </div>
        <button className="enter" onClick={handlechange}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Form;
