import { useState } from "react";
import classes from "./Carousel.module.scss";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import Slide from "./Slide";
import slidesData from "./slidesData";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [length] = useState(slidesData.length);

  function goToPrevSlide() {
    let index = activeIndex;

    if (index < 1) index = length - 1;
    else index--;

    setActiveIndex(index);
  }

  function goToNextSlide() {
    let index = activeIndex;

    if (index === length - 1) index = 0;
    else index++;

    setActiveIndex(index);
  }

  function changeIndex(dotIndex) {
    setActiveIndex(dotIndex);
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes["arrow-left"]}>
          <ArrowLeft goToPrevSlide={goToPrevSlide} />
        </div>
        <Slide activeIndex={activeIndex} changeIndex={changeIndex} />
        <div className={classes["arrow-right"]}>
          <ArrowRight goToNextSlide={goToNextSlide} />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
