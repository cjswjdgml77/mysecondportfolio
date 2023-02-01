import React, { useEffect, useRef } from "react";

function Canvas() {
  const canvas1 = useRef(null);

  useEffect(() => {
    const ctx = canvas1.current.getContext("2d");
  }, []);

  return <canvas ref={canvas1} width={"100vw"} height={"100vh"}></canvas>;
}

export default Canvas;
