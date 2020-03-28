import React, { useState } from "react";
import "./App.css";

function App() {
  const [roomCode, setRoomCode] = useState(0);
  const [name, setName] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");

  const onCreateRoomClick = async () => {
    const response = await fetch(
      `http://localhost:3000/room/create/playerName/${name}/`,
      {
        method: "POST"
      }
    );

    if (response.status == 200) {
      const parsedResponse = await response.json();

      if (parsedResponse.joined) {
        setRoomCode(parsedResponse.roomCode);
      }
    }
  };

  const onJoinRoomClick = async () => {
    const response = await fetch(
      `http://localhost:3000/room/join/${joinRoomCode}/playerName/${name}/`,
      {
        method: "POST"
      }
    );

    if (response.status == 200) {
      const parsedResponse = await response.json();

      if (parsedResponse.joined) {
        setRoomCode(parsedResponse.roomCode);
      }
    }
  };

  const content =
    roomCode > 0 ? (
      <p>you're in room {roomCode}</p>
    ) : (
      <div className="joinRoom">
        <input
          placeholder="name"
          value={name}
          onChange={event => setName(event.target.value)}
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
              value={joinRoomCode}
              onChange={event => setJoinRoomCode(event.target.value)}
              style={{ marginTop: "6px", marginBottom: "6px" }}
            />
            <button onClick={onJoinRoomClick} disabled={!joinRoomCode}>
              join
            </button>
          </div>
        </div>
      </div>
    );

  return <div className="App">{content}</div>;
}

export default App;
