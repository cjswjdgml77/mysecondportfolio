import React, { useEffect, useRef } from "react";
import styles from "../styles";
import { flex } from "../styles";
import mainbg from "../assets/mainbg.jpg";
import blackripple from "../assets/blackripple.mp4";
import DinamicText from "../components/DinamicText";
import { IKImage, IKContext } from "imagekitio-react";

function Header() {
  const title = useRef(null);
  const bgImages = [
    "/bg.jpg",
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
    "/bg6.jpg",
    "/bg7.jpg",
    "/bg.jpg",
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
    "/bg6.jpg",
    "/bg7.jpg",
    "/bg6.jpg",
    "/bg7.jpg",
    "/bg6.jpg",
    "/bg7.jpg",
    "/bg.jpg",
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
    "/bg6.jpg",
    "/bg7.jpg",
    "/bg.jpg",
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
    "/bg6.jpg",
  ];
  const VideoClick = () => {
    const imageDiv = document.querySelectorAll(".image-div");
    imageDiv.forEach((img, idx) => {
      if (idx === 17) {
        img.style.width = `${window.innerWidth / 7}px`;
        //img.style.scale = "1";
        img.style.transitionDuration = `${500}ms`;
      } else {
        img.style.transitionDelay = `${500 + (idx % 7) * 100}ms`;
        img.style.opacity = `${0.7 + 1 / (idx === 0 ? 1 : idx)}`;
        img.style.transitionDuration = "1000ms";
        img.style.transform = "translateY(0%)";
        // img.style.transitionDuration = `${700 + Math.floor(5) * idx * 100}ms`;
      }
      img.style.marginBottom = "0px";
      //img.style.transitionDelay = `${Math.floor(idx % 21) * 20}ms`;
      img.style.transform = "translateX(0%) translateY(0%)";
    });
  };
  useEffect(() => {
    const arrangeImage = () => {
      const imageDiv = document.querySelectorAll(".image-div");
      let last = 6;
      let middleX = 3;
      let middleLeftY = 14;
      let middleRightY = 20;
      console.log(imageDiv.length);

      imageDiv.forEach((img, idx) => {
        let transY = 0;
        if (idx % 7 === 0) {
          img.style.transform = "translateY(500%)";
        } else if (idx % 7 === 1) {
          img.style.transform = "translateY(-500%)";
        } else if (idx % 7 === 2) {
          img.style.transform = "translateY(500%)";
        } else if (idx % 7 === 4) {
          img.style.transform = "translateY(-500%)";
        } else if (idx % 7 === 5) {
          img.style.transform = "translateY(500%)";
        } else if (idx % 7 === 6) {
          img.style.transform = "translateY(-500%)";
        }

        if (idx === last) {
          last += 7;
          middleX += 7;
        }

        img.style.width = `${window.innerWidth / 7}px`;
      });
    };
    arrangeImage();
    title.current.classList.add("text-show");
    const resizeHandler = () => {
      arrangeImage();
    };
    window.addEventListener("resize", resizeHandler);
  });

  return (
    <div className={`header ${styles.topLayout} h-[100vh] items-center`}>
      <div className="w-full h-[80vh] sm:h-full overflow-hidden flex flex-row flex-wrap content-start">
        {bgImages.map((img, idx) => (
          <div
            className={`grow-[1] image-div transition-all ease-in-out ${
              idx === 17
                ? "z-[2] min-h-[20%] max-h-[20%] scale-x-[5] scale-y-[2.5] lg:scale-[5]"
                : "min-h-[20%] max-h-[20%] opacity-0"
            }`}
            key={idx}
          >
            <IKContext
              publicKey="public_hb+ssSooWMAAm/OUsGKnHyxixAw="
              urlEndpoint="https://ik.imagekit.io/cjswjdgml"
              transformationPosition="path"
              authenticationEndpoint="http://www.yourserver.com/auth"
            >
              <IKImage path={`${img}`} className="w-full h-full" />
            </IKContext>
          </div>
        ))}
      </div>
      <div
        className={`absolute top-0 h-full  ${flex.col} z-[2]`}
        onClick={() => {
          VideoClick();
        }}
      >
        <div className="overflow-hidden">
          <h1
            className="text-hide text-second relative inline-block text-[4rem]"
            ref={title}
          >
            Trips to World
          </h1>
        </div>
        <DinamicText textArr={["c", "l", "i", "c", "k"]} />
        <DinamicText textArr={["a", "n", "d"]} />
        <DinamicText textArr={["l", "o", "o", "k"]} />
      </div>
    </div>
  );
}

export default Header;
