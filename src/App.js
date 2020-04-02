import "./App.css";
import io from "socket.io-client";
import Pad from "./Pad";
import React, { useState, useEffect } from "react";
import WaitingRoom from "./WaitingRoom";
import Welcome from "./Welcome";

function App() {
  const [gameState, setGameState] = useState("pre"); // pre, in, post
  const [isLeader, setIsLeader] = useState(false);
  const [name, setName] = useState("");
  const [pad, setPad] = useState(null);
  const [players, setPlayers] = useState([]);
  const [roomCode, setRoomCode] = useState(0);

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
          setGameState("in");
        }
      }
    });

    socket.on("gameOver", async payload => {
      if (isRoomMessage(payload.roomCode)) {
        setGameState("post");
      }
    });

    return () => socket.close();
  }, [roomCode, name]);

  const onRoomJoined = (roomCode, players, isLeader) => {
    setRoomCode(roomCode);
    setPlayers(players);
    setIsLeader(isLeader);
  };

  const content = React.useMemo(() => {
    switch (gameState) {
      case "pre":
        return roomCode ? (
          <WaitingRoom
            players={players}
            showStartGameButton={isLeader}
            roomCode={roomCode}
          />
        ) : (
          <Welcome
            name={name}
            onRoomJoined={onRoomJoined}
            onNameChange={setName}
          />
        );
      case "in":
        return <Pad pad={pad} roomCode={roomCode} name={name} />;
      case "post":
        return <p>game over</p>;
      default:
        return <>🤷‍♀️</>;
    }
  }, [gameState, players, isLeader, roomCode, name, pad]);

  return (
    <div className="App">
      <div className="content">{content}</div>
    </div>
  );
}

export default App;
