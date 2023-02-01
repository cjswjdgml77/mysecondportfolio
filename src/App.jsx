import React, { useCallback, useEffect, useRef, useState } from "react";
import travelSpot from "./assets";
import { TravelSpot, Header } from "./container";
import styles from "./styles";
function App() {
  const outterDiv = useRef(null);
  const slideLay = useRef(null);
  useEffect(() => {
    let disableScroll = false;
    let indexOfSlide = 0;

    const mywheel = function (e) {
      if (!disableScroll) {
        disableScroll = true;
        // const childOfApp = outterDiv.current.children;
        const slideLays = slideLay.current.children;
        function changeIndex(idx) {
          indexOfSlide = indexOfSlide + idx;
        }
        if (e.deltaY > 0 && indexOfSlide < slideLays.length) {
          slideLays[indexOfSlide].classList.toggle("page-slide-up");
          slideLays[indexOfSlide].classList.toggle("bg-primary");
          console.log("down execute");
          changeIndex(+1);

          // window.removeEventListener("wheel", mywheel);
        } else if (e.deltaY < 0 && indexOfSlide >= 1) {
          console.log("up execute");
          changeIndex(-1);
          slideLays[indexOfSlide].classList.toggle("page-slide-up");
          slideLays[indexOfSlide].classList.toggle("bg-primary");
          //  window.removeEventListener("wheel", mywheel);
        }
        const scrollTime = setTimeout(() => {
          disableScroll = false;
          clearTimeout(scrollTime);
        }, 1000);
      }
    };
    window.addEventListener("wheel", mywheel);
  }, []);
  return (
    <div
      className="w-full flex flex-col bg-black transition-all duration-[0.7s] delay-150 ease-in-out"
      ref={outterDiv}
    >
      <Header />
      <div className={`${styles.topLayout}`} ref={slideLay}>
        <TravelSpot title={"Sydney"} travelImages={travelSpot.sydney} />
        <TravelSpot title={"Melbourne"} travelImages={travelSpot.melbourne} />
        <TravelSpot title={"Gold Coast"} travelImages={travelSpot.goldcoast} />
      </div>
    </div>
  );
}

export default App;
