import React, { useState, useEffect } from "react";

export default function Pad(props) {
  const isTesting = true;

  const { owner, holder, pages, task, id } = props.pad;

  const [guess, setGuess] = useState("");
  const [waitingForOthers, setWaitingForOthers] = useState("");
  const [drawing] = useState({});

  useEffect(() => {
    setWaitingForOthers(false);
  }, [props.pad]);

  const onSubmitClicked = () => {
    setWaitingForOthers(true);

    if (task === "draw") {
    } else {
    }

    fetch(
      `http://localhost:3000/room/submit/${props.roomCode}/playerName/${props.name}/padId/${id}`,
      {
        method: "POST"
      }
    );
  };

  const title =
    owner.position === holder ? (
      <p>you have your own pad</p>
    ) : (
      <p>
        you have <strong>{owner.name}</strong>'s pad
      </p>
    );

  const taskDescription =
    task === "draw" ? (
      <p>
        draw your best <strong>{pages[pages.length - 1]}</strong>
      </p>
    ) : (
      <>
        <p>what do you think this drawing is?</p>
        <input
          style={{ marginTop: "12px", marginBottom: "12px" }}
          value={guess}
          onChange={setGuess}
        />
      </>
    );

  return waitingForOthers ? (
    <p>waiting for others to finish...</p>
  ) : (
    <>
      {title}
      {taskDescription}
      <button
        onClick={onSubmitClicked}
        disabled={!guess && !drawing && !isTesting}
        style={{
          marginBottom: "12px"
        }}
      >
        submit
      </button>
    </>
  );
}
