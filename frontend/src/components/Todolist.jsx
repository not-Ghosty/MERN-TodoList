import React, {useEffect, useState} from "react";
import "../global.css";
import edit from "./edit.png";
import delete1 from "./delete.png";
import moment from "moment";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {remove} from "../store/DataSlice";
import {Link} from "react-router-dom";

const Todolist = ({x}) => {
  const [item, setItem] = useState([]);

  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.APIData);
  const {user} = useSelector((state) => state.UserData);

  useEffect(() => {
    setItem(data);
  }, [data]);

  const deleteOne = (id) => {
    axios
      .delete(`/api/todolist/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        dispatch(remove(id));
      })
      .catch((err) => {
        console.log("Delete Error", err);
      });
  };

  return (
    <div className="lists">
      {item &&
        item.map((x) => (
          <div className="todo_card" key={x._id}>
            <section className="list_card" title={x._id}>
              <h1>Title: {x.title}</h1>
              <p>
                Duration: {"  "}
                {x.duration} {x.duration > 1 ? "hours" : "hour"}
              </p>

              <span className="createTime">
                {moment(x.createdAt).fromNow()}
              </span>
              {moment(x.createdAt).fromNow() ===
              moment(x.updatedAt).fromNow() ? (
                <></>
              ) : (
                <span className="updateTime">
                  <var>Edited {"  "}</var>
                  {moment(x.updatedAt).fromNow()}
                </span>
              )}
            </section>
            <div className="edit">
              <Link to={`/edit/${x._id}`}>
                <button className="Btn">
                  <div className="sign">
                    <img src={edit} alt="" />
                  </div>
                  <div className="text">Edit</div>
                </button>
              </Link>
            </div>
            <div className="delete">
              <button
                className="delbtn"
                onClick={() => deleteOne(x._id)}
                title="Delete"
              >
                <img src={delete1} alt="" width={28} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Todolist;
