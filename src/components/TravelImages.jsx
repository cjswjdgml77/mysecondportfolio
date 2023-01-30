import React, { useEffect, useRef, useState } from "react";
import styles from "../styles";
import MaxButton from "./MaxButton";
import ImageControlBtn from "./ImageControlBtn";
function TravelImages({ travelImages, title }) {
  const imageBox = useRef(null);
  const fullImage = useRef(null);
  const [draggable, isDraggable] = useState(null);
  const [start, isStart] = useState(0);
  const [isClicked, setIsClicked] = useState(null);
  const [isMax, setIsMax] = useState(false);
  useEffect(() => {
    if (isMax) {
      const listsOfImeages = imageBox.current.childNodes;
      console.log(window.innerWidth * 15 * 20) / (100 * listsOfImeages.length);
      isClicked ? adjustImages(isClicked) : adjustImages(0);
      fullImage.current.style.setProperty("--move", `-${isClicked * 100}%`);
      const imageGap = (window.innerWidth * 5 * listsOfImeages.length) / 100;

      const paddingLeft = (window.innerWidth * 42.5) / 2 / 2000;
      imageBox.current.style.transformOrigin = "bottom";
      imageBox.current.style.transform = `translateX(${
        (window.innerWidth * 15) / (100 * listsOfImeages.length * 20) -
        paddingLeft -
        (start * 20) / 100
      }px) scale(0.2)`;
    } else {
      imageBox.current.style.scale = 1;
      const listsOfImeages = imageBox.current.childNodes;
      imageBox.current.style.transform = "translateY(0px)";
    }
  }, [isMax]);
  const DragStart = (e) => {
    isDraggable(true);
  };

  const DragActive = (e) => {
    if (!draggable) return;

    const speed = 3;
    const listsOfImeages = imageBox.current.childNodes;
    const imageGap = (window.innerWidth * 5 * listsOfImeages.length) / 2 / -100;
    const imageSize = (window.innerWidth * 15) / -100;
    const paddingLeft = (window.innerWidth * 42.5) / -100;

    if (isClicked || isClicked === 0) {
      setIsClicked(null);
    }
    console.log(start + e.movementX * speed);
    listsOfImeages.forEach((image, idx) => {
      if (start + e.movementX * speed > 0) {
        image.style.transform = `translateX(0px)`;
        isStart(0);
      } else if (
        start + e.movementX * speed <
        imageSize * listsOfImeages.length + paddingLeft
      ) {
        image.style.transform = `translateX(${
          imageSize * listsOfImeages.length + paddingLeft
        }px)`;
      } else {
        isStart(() => start + e.movementX * speed);
        image.style.transform = `translateX(${start + e.movementX * speed}px)`;
      }
    });
  };

  const DragStop = (e) => {
    isDraggable(false);
  };
  const adjustImages = (idx) => {
    const listsOfImeages = imageBox.current.childNodes;
    listsOfImeages.forEach((img, index) => {
      if (index === idx) {
        img.style.transform = `translateX(${start}px) scale(1.5)`;
      } else {
        console.log(idx);
        if (start === 0 || start) {
          let add = (window.innerWidth * 5) / 100;
          if (index < idx) {
            add = add * -1;
          }
          img.style.transform = `translateX(${start + add}px)`;
          img.style.transitionDelay = "0s";
        }
      }
    });
  };
  const ImageClick = (idx) => {
    const listsOfImeages = imageBox.current.childNodes;
    // if (isClicked === idx) {
    //   listsOfImeages[isClicked].style.transitionDelay = "0s";
    //   setIsClicked(null);
    // }
    setIsClicked(() => {
      listsOfImeages.forEach((img, index) => {
        if (index === idx) {
          img.style.transform = `translateX(${start}px) scale(1.5)`;
        } else {
          console.log(idx);
          if (start === 0 || start) {
            let add = (window.innerWidth * 5) / 100;
            if (index < idx) {
              add = add * -1;
            }
            img.style.transform = `translateX(${start + add}px)`;
          }
        }
      });
      return idx;
    });
  };
  return (
    <div className={`${styles.topLayout} flex-col overflow-hidden`}>
      <h2 className="absolute w-full top-3 text-center text-second text-7xl pt-8">
        {title}
      </h2>
      <MaxButton max={isMax} setMax={setIsMax} />

      <ul
        className={`w-full flex flex-1 absolute top-0 transition-all delay-100 duration-500 ease-out translate-x-[var(--move)]
          ${isMax ? "visible scale-[1] opacity-100" : "opacity-60"}
        `}
        style={{ "--move": "0" }}
        ref={fullImage}
      >
        {travelImages.map((imgUrl, idx) => (
          <li className="min-w-[100vw] h-[100vh]" key={idx}>
            <img
              src={imgUrl}
              alt="sydney"
              className={`w-full h-full object-fill`}
            />
          </li>
        ))}
      </ul>
      {isMax && (
        <div className="absolute top-0 flex justify-center items-center w-full h-full">
          <div className="w-[50%] flex justify-between">
            <ImageControlBtn
              text={["P", "r", "e", "v"]}
              imageui={fullImage}
              adjustImages={adjustImages}
            />
            <ImageControlBtn
              text={["N", "e", "x", "t"]}
              delay={800}
              right={true}
              imageui={fullImage}
              adjustImages={adjustImages}
            />
          </div>
        </div>
      )}
      <ul
        className={`w-full relative flex flex-1 items-center transition-transform duration-[600ms] ease-in-out pl-[42.5vw] gap-[5vw]`}
        ref={imageBox}
        onMouseDown={(e) => {
          DragStart(e);
        }}
        onMouseUp={(e) => {
          DragStop(e);
        }}
        onMouseLeave={() => {
          console.log("leave");
          isDraggable(false);
        }}
        onMouseMove={(e) => {
          DragActive(e);
        }}
      >
        {travelImages.map((imgUrl, idx) => (
          <li
            className={`h-[20vw] min-w-[15vw] transition-transform duration-[1s] ease-in-out ${
              isMax ? "pointer-events-none" : ""
            }`}
            key={idx}
            onClick={() => {
              if (isClicked === idx) return;
              ImageClick(idx);
            }}
          >
            <img className={`object-cover h-full w-full`} src={imgUrl} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TravelImages;
