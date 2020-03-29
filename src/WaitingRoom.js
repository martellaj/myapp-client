import React from "react";

export default function WaitingRoom(props) {
  const { players, showStartGameButton, roomCode } = props;

  const onStartGameClicked = async () => {
    const response = await fetch(
      `http://localhost:3000/room/start/${roomCode}`,
      {
        method: "POST"
      }
    );

    if (response.status !== 200) {
      // todo: error handling
    }
  };

  return (
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
      {showStartGameButton && (
        <button onClick={onStartGameClicked}>start game</button>
      )}
    </>
  );
}
