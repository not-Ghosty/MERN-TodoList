import React, {useEffect, useState} from "react";
import "../global.css";
import Form from "./Form";
import Todolist from "./Todolist";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {set} from "../store/DataSlice";

const Body = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
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
        const data = response.data;
        setData(data);
        dispatch(set(data));
        setTimeout(() => {
          setShow(true);
        }, 1000);
      });
  }, [dispatch, user]);

  const callback = (x) => {
    setData(x);
  };

  return (
    <div className="body">
      <div className="input">
        <Form callback={callback} />
      </div>
      {user && show ? (
        <div className="output">
          {data.map((value, index) => (
            <Todolist key={index} tlist={value} callback={callback} />
          ))}
        </div>
      ) : (
        <div className="output">
          <div className="loading">
            <section className="todo_card">
              <div class="loader">
                <div class="wrapper">
                  <div class="circle"></div>
                  <div class="line-1"></div>
                  <div class="line-2"></div>
                  <div class="line-3"></div>
                  <div class="line-4"></div>
                </div>
              </div>
            </section>
            <section className="todo_card">
              <div class="loader">
                <div class="wrapper">
                  <div class="circle"></div>
                  <div class="line-1"></div>
                  <div class="line-2"></div>
                  <div class="line-3"></div>
                  <div class="line-4"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
