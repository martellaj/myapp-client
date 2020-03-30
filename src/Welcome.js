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
      <input
        placeholder="name"
        value={name}
        onChange={event => onNameChange(event.target.value)}
        style={{
          marginBottom: "12px"
        }}
      />
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "24px"
          }}
        >
          create a new room
          <button
            onClick={onCreateRoomClick}
            disabled={!name}
            style={{
              marginBottom: "12px"
            }}
          >
            create
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          join a room
          <input
            placeholder="1234"
            value={roomCode}
            onChange={event => setRoomCode(event.target.value)}
            style={{ marginTop: "6px", marginBottom: "6px" }}
          />
          <button onClick={onJoinRoomClick} disabled={!roomCode}>
            join
          </button>
        </div>
      </div>
    </div>
  );
}
