import React, { useState } from "react";

export default function Welcome(props) {
  const [roomCode, setRoomCode] = useState("");
  const { name, onNameChange } = props;

  const onCreateRoomClick = async () => {
    const response = await fetch(
      `http://localhost:3000/room/create/playerName/${name}/`,
      {
        method: "POST"
      }
    );

    if (response.status === 200) {
      const parsedResponse = await response.json();

      if (parsedResponse.joined) {
        props.onRoomJoined(parsedResponse.roomCode, [], true /* isLeader */);
      }
    }
  };

  const onJoinRoomClick = async () => {
    const response = await fetch(
      `http://localhost:3000/room/join/${roomCode}/playerName/${name}/`,
      {
        method: "POST"
      }
    );

    if (response.status === 200) {
      const parsedResponse = await response.json();

      if (parsedResponse.joined) {
        props.onRoomJoined(
          parsedResponse.roomCode,
          parsedResponse.players,
          false /* isLeader */
        );
      }
    }
  };

  return (
    <div className="Welcome">
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <strong>your name</strong>
        <input
          placeholder="joe"
          value={name}
          onChange={event => onNameChange(event.target.value)}
          style={{ marginTop: "6px", marginBottom: "6px" }}
        />
      </div>

      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <strong style={{ marginTop: "6px", marginBottom: "6px" }}>
          create a new room
        </strong>
        <button
          onClick={onCreateRoomClick}
          disabled={!name}
          style={{
            marginBottom: "12px"
          }}
        >
          🏠 new room
        </button>
      </div>

      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <strong>join a room</strong>
        <input
          placeholder="i.e. 0825"
          value={roomCode}
          onChange={event => setRoomCode(event.target.value)}
          style={{ marginTop: "6px", marginBottom: "6px" }}
        />
        <button onClick={onJoinRoomClick} disabled={!roomCode}>
          🧑 join room
        </button>
      </div>
    </div>
  );
}
