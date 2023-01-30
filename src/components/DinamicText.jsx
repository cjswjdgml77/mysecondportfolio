import React, { useEffect, useRef } from "react";
import { flex } from "../styles";
function DinamicText({ textArr }) {
  const letters = useRef(null);
  useEffect(() => {
    letters.current.childNodes.forEach((letter, idx) => {
      letter.style.setProperty("--delay", `${0.2 + 0.1 * idx}s`);
      letter.classList.add("text-show");
    });
  });
  return (
    <div
      className={`${flex.row} uppercase text-[3rem] overflow-hidden`}
      ref={letters}
    >
      {textArr.map((text, idx) => (
        <div key={idx} className="text-second text-hide">
          {text}
        </div>
      ))}
    </div>
  );
}

export default DinamicText;
