import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Color.module.scss";
import fullProductData from "../fullProductData";

function Color() {
  const [isActive, setIsActive] = useState(false);

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const colorData = [];

    for (let product of fullProductData) {
      colorData.push(product.color);
    }

    const colors = [...new Set(colorData.sort())];

    return colors.map((color, index) => (
      <div className={classes.container}>
        <label htmlFor={`color${index}`}>
          {color}
          <input type="checkbox" id={`color${index}`}></input>
          <span className={classes.checkmark}></span>
        </label>
      </div>
    ));
  }

  return (
    <>
      <span>Color</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      {isActive && (
        <div className={classes.dropdown}>
          <Checkbox />
        </div>
      )}
    </>
  );
}

export default Color;
