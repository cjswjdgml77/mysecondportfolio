import React from "react";
import TravelImages from "../components/TravelImages";
import TravelTitle from "../components/TravelTitle";
import styles from "../styles";
function Sydney({ slide }) {
  const travelImages = [
    "http://localhost:3000/sydney/sydney.jpg",
    "http://localhost:3000/sydney/sydney1.jpg",
    "http://localhost:3000/sydney/sydney2.jpg",
    "http://localhost:3000/sydney/sydney3.jpg",
    "http://localhost:3000/sydney/sydney4.jpg",
    "http://localhost:3000/sydney/sydney5.jpg",
    "http://localhost:3000/sydney/sydney6.jpg",
    "http://localhost:3000/sydney/sydney.jpg",
    "http://localhost:3000/sydney/sydney1.jpg",
    "http://localhost:3000/sydney/sydney2.jpg",
    "http://localhost:3000/sydney/sydney3.jpg",
    "http://localhost:3000/sydney/sydney4.jpg",
    "http://localhost:3000/sydney/sydney5.jpg",
    "http://localhost:3000/sydney/sydney6.jpg",
    "http://localhost:3000/sydney/sydney.jpg",
    "http://localhost:3000/sydney/sydney1.jpg",
    "http://localhost:3000/sydney/sydney2.jpg",
    "http://localhost:3000/sydney/sydney3.jpg",
    "http://localhost:3000/sydney/sydney4.jpg",
    "http://localhost:3000/sydney/sydney5.jpg",
    "http://localhost:3000/sydney/sydney6.jpg",
  ];
  return (
    <section
      className={`${styles.slideLayout} ${
        slide === true ? "page-slide-up bg-primary" : "page-slide-down"
      }`}
    >
      {/* <TravelTitle title={"Sydney"} /> */}
      <TravelImages travelImages={travelImages} title={"Sydney"} />
    </section>
  );
}

export default Sydney;
