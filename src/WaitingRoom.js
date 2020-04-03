import getApi from "./getApi";
import React from "react";

export default function WaitingRoom(props) {
  const { players, showStartGameButton, roomCode } = props;

  const onStartGameClicked = async () => {
    const response = await fetch(`${getApi()}room/start/${roomCode}`, {
      method: "POST"
    });

    if (response.status !== 200) {
      // todo: error handling
    }
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <p style={{ margin: "24px 0" }}>
        you're in room <strong>{roomCode}</strong>
      </p>
      {players.length > 0 ? (
        <p style={{ margin: "24px 0" }}>who's in the house?</p>
      ) : (
        <p style={{ margin: "24px 0" }}>waiting for people to join...</p>
      )}
      <ul style={{ margin: "24px 0" }}>
        {players.map(player => (
          <li key={player.name}>{player.name}</li>
        ))}
      </ul>
      {showStartGameButton && (
        <button onClick={onStartGameClicked}>🔫 start game</button>
      )}
    </div>
  );
}
