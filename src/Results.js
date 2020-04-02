import React, { useState, useMemo } from "react";
import ResultPad from "./ResultPad";

export default function Results(props) {
  const { pads } = props;

  const [selectedPad, setSelectedPad] = useState();

  const resultPad = useMemo(() => {
    if (selectedPad) {
      for (const pad of pads) {
        if (pad.owner.name === selectedPad) {
          return pad;
        }
      }
    }

    return null;
  }, [pads, selectedPad]);

  const content = resultPad ? (
    <ResultPad pad={resultPad} onBackClicked={() => setSelectedPad(null)} />
  ) : (
    <>
      <h2>game over</h2>
      <h3>results</h3>
      <ul>
        {pads.map(pad => (
          <li key={pad.owner.name}>
            <a
              role="button"
              href="#"
              onClick={() => {
                setSelectedPad(pad.owner.name);
              }}
            >
              {pad.owner.name}'s pad
            </a>
          </li>
        ))}
      </ul>
    </>
  );

  return content;
}
