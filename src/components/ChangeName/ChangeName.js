import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formAppear } from "../../utils/selectors";
import { changePlayerName, showForm } from "../../utils/store";
import "./ChangeName.scss";

export default function ChangeName() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const formShow = useSelector(formAppear);
  const dispatch = useDispatch();
  console.log(formShow);
  function changeNameForm() {
    dispatch(changePlayerName(name1, name2));
  }
  return (
    <div className="container">
      <button
        className="btn nameBtn"
        onClick={() => {
          dispatch(showForm());
        }}
      >
        Changer le nom des joueurs
      </button>
      <form
        className={formShow ? "show form" : "hide form"}
        onSubmit={(e) => {
          e.preventDefault();
          changeNameForm();
          dispatch(showForm());
        }}
      >
        <input
          type="text"
          id="player1"
          placeholder="Rename player 1"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        <input
          type="text"
          id="player2"
          placeholder="Rename player 2"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />
        <button className="btn" type="submit">
          change name
        </button>
      </form>
    </div>
  );
}
