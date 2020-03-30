import React from "react";

export default function Pad(props) {
  const { owner, holder, pages, task } = props.pad;

  const title =
    owner.position === holder ? (
      <p>you have your own pad</p>
    ) : (
      <p>
        you have <strong>{owner.name}</strong>'s pad
      </p>
    );
  const taskDescription =
    task === "draw" ? (
      <p>
        draw your best <strong>{pages[pages.length - 1]}</strong>
      </p>
    ) : (
      <p>what do you think this drawing is?</p>
    );

  return (
    <>
      {title}
      {taskDescription}
    </>
  );
}
