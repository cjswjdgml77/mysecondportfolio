import React, { useEffect, useRef } from "react";
import styles from "../styles";
function TravelTitle({ title }) {
  const titleLay = useRef(null);
  const titleH2 = useRef(null);
  useEffect(() => {
    const scroll = (e) => {
      const layPos = titleLay.current.getBoundingClientRect();

      if (layPos.top <= 0 && layPos.top >= screen.height * -2) {
        console.log(Math.abs(layPos.top) / 1000);
        titleH2.current.style.scale = `${
          1 - Math.abs(layPos.top) / (screen.height * 3)
        }`;
      }
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return (
    <div className={`${styles.titleLayout} h-[300vh]`} ref={titleLay}>
      {/* <div className="w-full h-[300vh] relative"></div> */}
      <div className="sticky h-[100vh] top-0 bg-black">
        <h2
          className="relative font-bold text-white text-[20rem] z-2 transition-all duration-100 ease-linear"
          ref={titleH2}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export default TravelTitle;
