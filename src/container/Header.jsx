import React, { useEffect, useRef } from "react";
import styles from "../styles";
import { flex } from "../styles";
import mainbg from "../assets/mainbg.jpg";
import blackripple from "../assets/blackripple.mp4";
import DinamicText from "../components/DinamicText";
function Header() {
  const title = useRef(null);
  const bgImages = [
    "http://localhost:3000/images/bg.jpg",
    "http://localhost:3000/images/bg1.jpg",
    "http://localhost:3000/images/bg2.jpg",
    "http://localhost:3000/images/bg3.jpg",
    "http://localhost:3000/images/bg4.jpg",
    "http://localhost:3000/images/bg5.jpg",
    "http://localhost:3000/images/bg6.jpg",
    "http://localhost:3000/images/bg7.jpg",
    "http://localhost:3000/images/bg.jpg",
    "http://localhost:3000/images/bg1.jpg",
    "http://localhost:3000/images/bg2.jpg",
    "http://localhost:3000/images/bg3.jpg",
    "http://localhost:3000/images/bg4.jpg",
    "http://localhost:3000/images/bg5.jpg",
    "http://localhost:3000/images/bg6.jpg",
    "http://localhost:3000/images/bg7.jpg",
    "http://localhost:3000/images/bg6.jpg",
    "http://localhost:3000/images/bg7.jpg",
    "http://localhost:3000/images/bg6.jpg",
    "http://localhost:3000/images/bg7.jpg",
    "http://localhost:3000/images/bg.jpg",
    "http://localhost:3000/images/bg1.jpg",
    "http://localhost:3000/images/bg2.jpg",
    "http://localhost:3000/images/bg3.jpg",
    "http://localhost:3000/images/bg4.jpg",
    "http://localhost:3000/images/bg5.jpg",
    "http://localhost:3000/images/bg6.jpg",
    "http://localhost:3000/images/bg7.jpg",
    "http://localhost:3000/images/bg.jpg",
    "http://localhost:3000/images/bg1.jpg",
    "http://localhost:3000/images/bg2.jpg",
    "http://localhost:3000/images/bg3.jpg",
    "http://localhost:3000/images/bg4.jpg",
    "http://localhost:3000/images/bg5.jpg",
    "http://localhost:3000/images/bg6.jpg",
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
        // if (idx < middleX) {
        //   if (idx < middleLeftY || idx > middleRightY) {
        //     transY = (2 - Math.floor(idx / 7)) * 100;
        //   }
        //   img.style.transform = `translateX(${
        //     Math.floor((middleX - idx) % 10) * 100
        //   }%) translateY(${transY}%)`;
        // } else if (idx > middleX) {
        //   if (idx < middleLeftY || idx > middleRightY) {
        //     transY = (2 - Math.floor(idx / 7)) * 100;
        //   }
        //   img.style.transform = `translateX(${
        //     Math.floor((idx - middleX) % 10) * -100
        //   }%) translateY(${transY}%)`;
        // } else {
        //   if (idx < middleLeftY || idx > middleRightY) {
        //     transY = (2 - Math.floor(idx / 7)) * 100;
        //   }
        //   img.style.transform = `translateY(${transY}%)`;
        // }
        if (idx === last) {
          last += 7;
          middleX += 7;
        }
        // idx === 17
        //   ? (img.style.width = "100%")
        //   :
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
            <img
              className="object-fill h-[100%] w-[100%] align-top"
              src={img}
            />
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
