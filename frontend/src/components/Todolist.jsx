import React from "react";
import "../global.css";
import edit from "./edit.png";
import delete1 from "./delete.png";
import moment from "moment";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {remove} from "../store/DataSlice";
import {Link} from "react-router-dom";

const Todolist = ({tlist}) => {
  const createdDate = moment(tlist.createdAt).fromNow();
  const updatedDate = moment(tlist.updatedAt).fromNow();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.UserData);

  const deleteOne = (id) => {
    axios
      .delete(`/api/todolist/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        dispatch(remove(id));
      });
  };

  return (
    <div className="lists">
      <div className="todo_card">
        <section className="list_card" title={tlist._id}>
          <h1>Title: {tlist.title}</h1>
          <p>
            Duration: {"  "}
            {tlist.duration} {tlist.duration > 1 ? "hours" : "hour"}
          </p>

          <span className="createTime">{createdDate}</span>
          {createdDate === updatedDate ? (
            <></>
          ) : (
            <span className="updateTime">
              <var>Edited {"  "}</var>
              {updatedDate}
            </span>
          )}
        </section>
        <div className="edit">
          <Link to={`/edit/${tlist._id}`}>
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
            onClick={() => deleteOne(tlist._id)}
            title="Delete"
          >
            <img src={delete1} alt="" width={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
