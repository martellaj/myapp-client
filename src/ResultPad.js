import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

export default function ResultPad(props) {
  const { pad, onBackClicked } = props;
  const { owner, pages } = pad;

  const [page, setPage] = useState(1);
  const [showWord, setShowWord] = useState(false);

  const canvasRef = useRef();

  const ownerName = <strong>{owner.name}</strong>;

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.loadSaveData(pages[page].drawing);
    }
  });

  return (
    <>
      <button onClick={onBackClicked}>◀ back</button>
      <p style={{ marginTop: "12px" }}>{ownerName}'s pad</p>
      {page % 2 !== 0 ? (
        <CanvasDraw
          ref={canvasRef}
          hideGrid={true}
          className={"canvasStyle"}
          disabled={true}
        />
      ) : (
        <div
          style={{
            display: "flex",
            height: "500px",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            width: "350px",
            border: "1px black solid",
            borderRadius: "4px"
          }}
        >
          <p>{pages[page]}</p>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          marginTop: "24px",
          marginBottom: "14px"
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          previous page
        </button>
        <p style={{ margin: 0 }}>
          page <strong>{page}</strong>
        </p>
        {page === pages.length - 1 ? (
          <button onClick={() => setShowWord(true)}>
            reveal {ownerName}'s word
          </button>
        ) : (
          <button onClick={() => setPage(page + 1)}>next page</button>
        )}
      </div>
      {showWord && <strong style={{ marginBottom: "12px" }}>{pages[0]}</strong>}
    </>
  );
}
