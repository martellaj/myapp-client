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
    const isRoomMessage = messageRoomCode => {
      // eslint-disable-next-line
      return messageRoomCode == roomCode;
    };

    const socket = io("http://localhost:3000");

    socket.on("newPlayer", payload => {
      if (isRoomMessage(payload.roomCode)) {
        setPlayers(payload.players);
      }
    });

    socket.on("gameStarted", payload => {
      if (isRoomMessage(payload.roomCode)) {
        setIsInGame(true);
      }
    });

    return () => socket.close();
  }, [roomCode]);

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
