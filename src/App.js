import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [roomCode, setRoomCode] = useState(0);
  const [name, setName] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [isInGame, setIsInGame] = useState(false);

  React.useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("newPlayer", payload => {
      setPlayers(payload.players);
    });

    socket.on("gameStarted", () => {
      setIsInGame(true);
    });

    return () => socket.close();
  }, []);

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
        setRoomCode(parsedResponse.roomCode);
        setIsLeader(true);
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

    if (response.status === 200) {
      const parsedResponse = await response.json();

      if (parsedResponse.joined) {
        setRoomCode(parsedResponse.roomCode);
        setPlayers(parsedResponse.players);
      }
    }
  };

  const onStartGameClicked = async () => {
    const response = await fetch(
      `http://localhost:3000/room/start/${roomCode}`,
      {
        method: "POST"
      }
    );

    if (response.status === 200) {
      const parsedResponse = await response.json();

      if (parsedResponse.gameStarted) {
        setIsInGame(true);
      }
    }
  };

  const gameContent = <p>you're in a game now</p>;

  const content =
    roomCode > 0 ? (
      <>
        <p>you're in room {roomCode}.</p>
        {players.length > 0 ? (
          <p>who's all here?</p>
        ) : (
          <p>waiting for people to join...</p>
        )}
        <ul>
          {players.map(player => (
            <li key={player.name}>{player.name}</li>
          ))}
        </ul>
        {isLeader && <button onClick={onStartGameClicked}>start game</button>}
      </>
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

  return <div className="App">{isInGame ? gameContent : content}</div>;
}

export default App;
