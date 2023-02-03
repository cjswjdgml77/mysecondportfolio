import React, { useEffect, useRef, useState } from "react";
import styles from "../styles";
import MaxButton from "./MaxButton";
import ImageControlBtn from "./ImageControlBtn";
import { IKImage, IKContext } from "imagekitio-react";

function TravelImages({ travelImages, title }) {
  const imageBox = useRef(null);
  const fullImage = useRef(null);
  const mycanvas = useRef(null);
  const controlBtnPrev = useRef(null);
  const controlBtnNext = useRef(null);

  const [draggable, isDraggable] = useState(null);
  const [start, isStart] = useState(0);
  const [isClicked, setIsClicked] = useState(null);
  const [isMax, setIsMax] = useState(false);
  useEffect(() => {
    const ctx = mycanvas.current.getContext("2d", { willReadFrequently: true });
    if (isMax) {
      const listsOfImeages = imageBox.current.childNodes;
      const image = new Image(window.innerWidth, window.innerHeight);
      image.onload = drawCanvas;
      image.src = travelImages[isClicked ? isClicked : 0].localurl;
      function drawCanvas() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        mycanvas.current.width = window.innerWidth;
        mycanvas.current.height = window.innerHeight;

        ctx.drawImage(this, 0, 0, window.innerWidth, window.innerHeight);

        const firstBtn = controlBtnPrev.current.getBoundingClientRect();
        const secondBtn = controlBtnNext.current.getBoundingClientRect();

        const imageData = ctx.getImageData(
          firstBtn.left,
          firstBtn.top,
          firstBtn.width,
          firstBtn.height
        );
        const imageData2 = ctx.getImageData(
          secondBtn.left,
          secondBtn.top,
          secondBtn.width,
          secondBtn.height
        );
        controlBtnPrev.current.style.setProperty(
          "--font-color",
          `rgb(${255 - imageData.data[0]},${255 - imageData.data[1]},${
            255 - imageData.data[2]
          })`
        );
        controlBtnNext.current.style.setProperty(
          "--font-color",
          `rgb(${255 - imageData2.data[0]},${255 - imageData2.data[1]},${
            255 - imageData2.data[2]
          })`
        );
      }
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
      imageBox.current.style.transform = "translateY(0px)";
    }
  }, [isMax, isClicked]);
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
    setIsClicked(() => {
      listsOfImeages.forEach((img, index) => {
        if (index === idx) {
          img.style.transform = `translateX(${start}px) scale(1.5)`;
        } else {
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
      return idx;
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
        {travelImages.map((imageData, idx) => (
          <li className="min-w-[100vw] h-[100vh]" key={idx}>
            <IKContext
              publicKey="public_hb+ssSooWMAAm/OUsGKnHyxixAw="
              urlEndpoint="https://ik.imagekit.io/cjswjdgml"
              transformationPosition="path"
              authenticationEndpoint="http://www.yourserver.com/auth"
            >
              <IKImage
                path={`${imageData.url}`}
                className="w-full h-full"
              ></IKImage>
            </IKContext>
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
              controlRef={controlBtnPrev}
            />
            <ImageControlBtn
              text={["N", "e", "x", "t"]}
              delay={800}
              right={true}
              imageui={fullImage}
              adjustImages={adjustImages}
              controlRef={controlBtnNext}
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
        {travelImages.map((imageData, idx) => (
          <li
            className={`relative h-[20vw] min-w-[15vw] max-w-[15vw] transition-transform duration-[1s] ease-in-out ${
              isMax ? "pointer-events-none" : ""
            }`}
            key={idx}
            onClick={() => {
              if (isClicked === idx) return;
              ImageClick(idx);
            }}
          >
            {/* <LazyLoad
              height={(window.innerWidth * 20) / 100}
              width={(window.innerWidth * 15) / 100}
              unmountIfInvisible={true}
            > */}
            <IKContext
              publicKey="public_hb+ssSooWMAAm/OUsGKnHyxixAw="
              urlEndpoint="https://ik.imagekit.io/cjswjdgml"
              transformationPosition="path"
              authenticationEndpoint="http://www.yourserver.com/auth"
            >
              <IKImage path={`${imageData.url}`} className="min-h-[100%]" />
            </IKContext>
          </li>
        ))}
      </ul>
      <canvas
        ref={mycanvas}
        style={{ position: "absolute", visibility: "hidden", zIndex: "-1" }}
      ></canvas>
      <div
        className={`absolute overflow-hidden bottom-[6vh] flex w-full justify-center transition-transform duration-300 ease-in
         ${
           isMax ? "sm:gap-30 gap-10 translate-y-[-350%]" : "sm:gap-15 gap-5 "
         }`}
      >
        {isClicked === 0 || isClicked
          ? travelImages[isClicked].tags.map((tag, idx) => (
              <div key={idx}>
                <p
                  style={{ "--delay": `${400 + idx * 100}ms` }}
                  className={`text-second  ${
                    isMax ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                  } tag-up`}
                >
                  {tag}
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default TravelImages;
