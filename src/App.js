import React, { useState } from "react";
import "./App.css";

function App() {
  const [roomCode, setRoomCode] = useState(0);

  const onCreateRoomClick = async () => {
    const response = await fetch(
      "http://localhost:3000/room/create/playerName/joe/",
      {
        method: "POST"
      }
    );

    if (response.status == 200) {
      const parsedResponse = await response.json();

      console.log(parsedResponse);

      if (parsedResponse.joined) {
        setRoomCode(parsedResponse.roomCode);
      }
    }
  };

  const onJoinRoomClick = () => {};

  const content =
    roomCode > 0 ? (
      <p>your in room {roomCode}</p>
    ) : (
      <>
        <button onClick={onCreateRoomClick}>create room</button>
        <button>join room</button>
      </>
    );

  return <div className="App">{content}</div>;
}

export default App;
