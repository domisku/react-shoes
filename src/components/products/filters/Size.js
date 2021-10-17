import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Size.module.scss";
import fullProductData from "../fullProductData";

function Size() {
  const [isActive, setIsActive] = useState(false);

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const sizesData = [];

    for (let product of fullProductData) {
      sizesData.push(...product.size);
    }

    const sizes = [...new Set(sizesData.sort())];

    return sizes.map((size, index) => (
      <div className={classes.container}>
        <label htmlFor={`size${index}`}>
          {size}
          <input type="checkbox" id={`size${index}`}></input>
          <span className={classes.checkmark}></span>
        </label>
      </div>
    ));
  }

  return (
    <>
      <span>Size</span>
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

export default Size;
