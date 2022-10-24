import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      let timeOutHandler;
      clearTimeout(timeOutHandler)
      timeOutHandler = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 500)
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}