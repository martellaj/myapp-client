import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Welcome from "./Welcome";
import WaitingRoom from "./WaitingRoom";

function App() {
  const [roomCode, setRoomCode] = useState(0);
  const [players, setPlayers] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [isInGame, setIsInGame] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("newPlayer", payload => {
      setPlayers(payload.players);
    });

    socket.on("gameStarted", () => {
      setIsInGame(true);
    });

    return () => socket.close();
  }, []);

  const onRoomJoined = (roomCode, players, isLeader) => {
    setRoomCode(roomCode);
    setPlayers(players);
    setIsLeader(isLeader);
  };

  const preGameContent = roomCode ? (
    <WaitingRoom
      players={players}
      showStartGameButton={isLeader}
      roomCode={roomCode}
    />
  ) : (
    <Welcome onRoomJoined={onRoomJoined} />
  );

  const gameContent = <p>you're in a game now</p>;

  return <div className="App">{isInGame ? gameContent : preGameContent}</div>;
}

export default App;
