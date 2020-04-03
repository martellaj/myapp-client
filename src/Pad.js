import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import getApi from "./getApi";

export default function Pad(props) {
  const { owner, holder, pages, task, id } = props.pad;

  const [guess, setGuess] = useState("");
  const [guessDrawn, setGuessDrawn] = useState(false);
  const [thickness, setThickness] = useState(2);
  const [waitingForOthers, setWaitingForOthers] = useState("");
  const canvasRef = useRef();
  const guessCanvasRef = useRef();

  useEffect(() => {
    setWaitingForOthers(false);
    setGuessDrawn(false);
  }, [props.pad]);

  useEffect(() => {
    if (props.pad.task === "guess" && !guessDrawn) {
      if (guessCanvasRef.current) {
        guessCanvasRef.current.loadSaveData(
          props.pad.pages[props.pad.pages.length - 1].drawing,
          false
        );

        setGuessDrawn(true);
      }
    }
  });

  const onSubmitClicked = () => {
    setWaitingForOthers(true);

    let data;
    if (task === "draw") {
      data = { drawing: canvasRef.current.getSaveData() };
    } else {
      data = { guess: guess };
    }

    fetch(
      `${getApi()}room/submit/${props.roomCode}/playerName/${
        props.name
      }/padId/${id}`,
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
          lazyRadius={0}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%"
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
            margin: "12px 0",
            width: "100%"
          }}
        >
          <button
            onClick={() => {
              canvasRef.current.undo();
            }}
          >
            ✏ undo
          </button>
          <button
            onClick={() => {
              canvasRef.current.clear();
            }}
          >
            💣 clear
          </button>
        </div>
      </>
    ) : (
      <>
        <p>what do you think this drawing is?</p>
        <CanvasDraw
          ref={guessCanvasRef}
          hideGrid={true}
          className={"canvasStyle"}
          disabled={true}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%"
          }}
        >
          <p
            style={{ fontWeight: "bold", marginBottom: "0", marginTop: "6px" }}
          >
            guess:
          </p>
          <input
            style={{ marginTop: "12px", marginBottom: "12px", width: "100%" }}
            value={guess}
            onChange={e => {
              setGuess(e.target.value);
            }}
          />
        </div>
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
        style={{
          margin: "12px 0",
          alignSelf: "center"
        }}
      >
        🤞 submit
      </button>
    </>
  );
}
