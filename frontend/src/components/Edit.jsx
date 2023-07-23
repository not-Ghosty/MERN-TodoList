import React, {useEffect, useState} from "react";
import "../global.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const {id} = useParams();

  const {user} = useSelector((state) => state.UserData);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/todolist/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setTitle(response.data.title);
        setDuration(response.data.duration);
      });
  }, [id, user.token]);

  const handleChange = () => {
    const payload = {title, duration};

    axios
      .patch(`/api/todolist/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="edit_div">
      <h1>Edit {title}</h1>
      <div className="todo_card">
        <section className="list_card">
          <h1 id="edit_head">Title: </h1>
          <input
            className="editInput"
            value={title}
            title="To-do name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
          />
          <br />
          <p id="edit_p">Duration: {"  "}</p>
          <input
            className="editInput"
            type="text"
            title="Estimated time to finish"
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            value={duration}
          />
          <button
            className="edit_button"
            onClick={handleChange}
            title="Update list"
          >
            Update
          </button>
        </section>
      </div>
    </div>
  );
};

export default Edit;
