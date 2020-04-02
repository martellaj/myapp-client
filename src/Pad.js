import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Pad(props) {
  const isTesting = true;

  const { owner, holder, pages, task, id } = props.pad;

  const [guess, setGuess] = useState("");
  const [waitingForOthers, setWaitingForOthers] = useState("");
  const [drawing] = useState({});
  const [thickness, setThickness] = useState(2);
  const canvasRef = useRef();

  useEffect(() => {
    setWaitingForOthers(false);
  }, [props.pad]);

  const onSubmitClicked = () => {
    setWaitingForOthers(true);

    let data;
    if (task === "draw") {
      data = { drawing: canvasRef.current.getSaveData() };
    } else {
      data = { guess: guess };
    }

    fetch(
      `http://localhost:3000/room/submit/${props.roomCode}/playerName/${props.name}/padId/${id}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      }
    );
  };

  const title =
    owner.position === holder ? (
      <p style={{ marginBottom: "0" }}>you have your own pad</p>
    ) : (
      <p style={{ marginBottom: "0" }}>
        you have <strong>{owner.name}</strong>'s pad
      </p>
    );

  const taskDescription =
    task === "draw" ? (
      <>
        <p>
          draw your best <strong>{pages[pages.length - 1]}</strong>
        </p>
        <CanvasDraw
          ref={canvasRef}
          hideGrid={true}
          className={"canvasStyle"}
          brushRadius={thickness}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start"
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0" }}>thickness:</p>
          <Slider
            className={"thicknessSlider"}
            min={1}
            max={12}
            value={thickness}
            onChange={value => {
              setThickness(value);
            }}
            onAfterChange={value => {
              setThickness(value);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "12px 0"
          }}
        >
          <button
            onClick={() => {
              canvasRef.current.undo();
            }}
          >
            undo
          </button>
          <button
            onClick={() => {
              canvasRef.current.clear();
            }}
          >
            clear
          </button>
        </div>
      </>
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
          marginBottom: "12px",
          alignSelf: "center"
        }}
      >
        submit
      </button>
    </>
  );
}
