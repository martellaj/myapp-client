import "./App.css";
import io from "socket.io-client";
import Pad from "./Pad";
import React, { useState, useEffect } from "react";
import WaitingRoom from "./WaitingRoom";
import Welcome from "./Welcome";

function App() {
  const [isLeader, setIsLeader] = useState(false);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [roomCode, setRoomCode] = useState(0);
  const [pad, setPad] = useState(null);

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

    socket.on("nextRound", async payload => {
      if (isRoomMessage(payload.roomCode)) {
        const response = await fetch(
          `http://localhost:3000/room/nextRound/${roomCode}/playerName/${name}/`,
          {
            method: "POST"
          }
        );

        if (response.status === 200) {
          const parsedResponse = await response.json();
          setPad(parsedResponse.pad);
        }
      }
    });

    return () => socket.close();
  }, [roomCode, name]);

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
    <Welcome name={name} onRoomJoined={onRoomJoined} onNameChange={setName} />
  );

  return <div className="App">{pad ? <Pad pad={pad} /> : preGameContent}</div>;
}

export default App;
