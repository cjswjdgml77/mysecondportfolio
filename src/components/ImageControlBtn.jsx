import React, { useEffect, useRef } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

function ImageControlBtn({ text, delay, right, imageui, adjustImages }) {
  const controlDiv = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const child = controlDiv.current.childNodes;
      console.log("실행");
      child.forEach((ptag) => {
        ptag.classList.toggle("transform__y-zero");
      });
    }, 100);
  }, []);
  const prevClick = () => {
    const idx = Number(
      imageui.current.style
        .getPropertyValue("--move")
        .match(/[-0-9]/g)
        .join("")
    );
    imageui.current.style.setProperty("--move", `${idx + 100}%`);
    console.log(idx);
    adjustImages(Math.abs(idx + 100) / 100);
  };
  const nextClick = () => {
    const idx = Number(
      imageui.current.style
        .getPropertyValue("--move")
        .match(/[-0-9]/g)
        .join("")
    );
    imageui.current.style.setProperty("--move", `${idx - 100}%`);
    console.log(idx);
    adjustImages(Math.abs(idx - 100) / 100);
  };
  return (
    <div className="relative trnasition-transform duration-300 img__sequnce-btn overflow-y-hidden group">
      <div
        className="flex overflow-y-hidden transition-transform duration-300 ease-in-out group-hover:-translate-y-[100%] mix-blend-color-dodge"
        ref={controlDiv}
      >
        {text.map((txt, idx) => (
          <p
            className={`text-orange-400 text-[1.125rem] transition-trasnform duration-300 translate-y-[100%] shadow-lg`}
            style={{ "--delay": `${delay ? delay + 100 * idx : 100 * idx}ms` }}
            key={idx}
          >
            {txt}
          </p>
        ))}
      </div>
      <button
        className={`absolute top-0 w-full h-full flex items-center text-second transition-transform duration-300 ease-in-out translate-y-[100%] group-hover:translate-y-[0%] ${
          right ? "active:translate-x-[20%]" : "active:-translate-x-[20%]"
        }`}
      >
        {right ? (
          <IoIosArrowRoundForward
            fontSize={"2rem"}
            onClick={() => {
              nextClick();
            }}
          />
        ) : (
          <IoIosArrowRoundBack
            fontSize={"2rem"}
            onClick={() => {
              prevClick();
            }}
          />
        )}
      </button>
    </div>
  );
}

export default ImageControlBtn;
