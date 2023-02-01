import React from "react";
import TravelImages from "../components/TravelImages";
import TravelTitle from "../components/TravelTitle";
import styles from "../styles";
function TravelSpot({ slide, title, travelImages }) {
  return (
    <section
      className={`${styles.slideLayout} ${
        slide === true ? "page-slide-up bg-primary" : "page-slide-down"
      }`}
    >
      {/* <TravelTitle title={"Sydney"} /> */}
      <TravelImages travelImages={travelImages} title={title} />
    </section>
  );
}

export default TravelSpot;
