import React, {useEffect} from "react";
import "../global.css";
import Form from "./Form";
import Todolist from "./Todolist";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {set} from "../store/DataSlice";

const Body = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.UserData);

  useEffect(() => {
    axios
      .get("/api/todolist", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        dispatch(set(response.data));
      });
  }, [user.token, dispatch]);

  return (
    <div className="body">
      <div className="input">
        <Form />
      </div>
      <div className="output">
        <Todolist />
      </div>
    </div>
  );
};

export default Body;
