import React, { useEffect, useRef } from "react";

function MaxButton({ max, setMax }) {
  const slideBox = useRef();
  useEffect(() => {
    setTimeout(() => {
      slideBox.current.childNodes.forEach((child) => {
        if (max) {
          child.classList.toggle("slide-button-on");
        } else {
          child.classList.toggle("slide-button-on");
        }
      });
    }, 100);
  }, [max]);
  const slideStyle =
    "w-[2vw] border-white border-2 transition-all duration-300 ease-in transform-x-[0px]";
  return (
    <div
      className="flex itmes-center justify-between absolute z-[4] top-6 left-6 w-[8vw] h-[6vh] cursor-pointer"
      onClick={() => {
        setMax(!max);
      }}
      ref={slideBox}
    >
      <div
        className={`${slideStyle}`}
        style={{
          "--right": "none",
          "--left": "2px solid white",
        }}
      ></div>
      <div
        style={{
          "--gap": `${window.innerWidth / -100 - 2}px`,
          "--left": "none",
        }}
        className={`${slideStyle}`}
      ></div>
      <div
        style={{
          "--gap": `${(window.innerWidth / -100) * 2 - 4}px`,
          "--right": "2px solid white",
        }}
        className={`${slideStyle}`}
      ></div>
      {/* <div
        className={` text-second top-6 left-6 absolute rounded-[2px] border-2 transition-all duration-300 cursor-pointer ${
          max ? "border-white" : "border-none"
        }`}
      >
        {max ? (
          <div className="flex items-center justify-center w-[6vw] h-[6vh]">
            <p>Max</p>
          </div>
        ) : (
          <div className="rounded-[2px] flex gap-[10px]" ref={slideBox}>
            <div className={`${slideStyle}`}></div>
            <div
              style={{ "--left": `calc(-150% + 10px)` }}
              className={`${slideStyle} max-button-move-left`}
            ></div>
            <div
              style={{ "--left": `calc(-300% + 20px)` }}
              className={`${slideStyle} delay-[150ms] max-button-move-left`}
            ></div>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default MaxButton;
