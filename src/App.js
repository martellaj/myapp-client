import "./App.css";
import io from "socket.io-client";
import Pad from "./Pad";
import React, { useState, useEffect } from "react";
import Results from "./Results";
import WaitingRoom from "./WaitingRoom";
import Welcome from "./Welcome";
import getApi from "./getApi";

function App() {
  const [gameState, setGameState] = useState("pre"); // pre, in, post
  const [isLeader, setIsLeader] = useState(false);
  const [name, setName] = useState(getName());
  const [pad, setPad] = useState(null);
  const [resultPads, setResultPads] = useState(null);
  const [players, setPlayers] = useState([]);
  const [roomCode, setRoomCode] = useState(0);

  useEffect(() => {
    const isRoomMessage = messageRoomCode => {
      // eslint-disable-next-line
      return messageRoomCode == roomCode;
    };

    const socket = io(getApi(), {
      transports: ["websocket"]
    });

    socket.on("newPlayer", payload => {
      if (isRoomMessage(payload.roomCode)) {
        setPlayers(payload.players);
      }
    });

    socket.on("nextRound", async payload => {
      if (isRoomMessage(payload.roomCode)) {
        const response = await fetch(
          `${getApi()}room/nextRound/${roomCode}/playerName/${name}/`,
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
        const response = await fetch(`${getApi()}room/gameOver/${roomCode}`, {
          method: "POST"
        });

        if (response.status === 200) {
          const parsedResponse = await response.json();
          setResultPads(parsedResponse.pads);
          setGameState("post");
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
            onNameChange={name => {
              setName(name);
              window.localStorage.setItem("name", name);
            }}
          />
        );
      case "in":
        return <Pad pad={pad} roomCode={roomCode} name={name} />;
      case "post":
        return <Results pads={resultPads} />;
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

function getName() {
  const isTesting = false;
  const storedName = window.localStorage.getItem("name");
  if (storedName && !isTesting) {
    return storedName;
  }

  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default App;
