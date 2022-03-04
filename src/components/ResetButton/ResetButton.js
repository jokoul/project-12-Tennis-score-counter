import React from "react";
import { useDispatch } from "react-redux";
import { restartGame } from "../../utils/store";

export default function ResetButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="btn"
      onClick={() => {
        dispatch(restartGame());
      }}
    >
      Remise à zero
    </button>
  );
}
