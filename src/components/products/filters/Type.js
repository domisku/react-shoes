import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Type.module.scss";
import fullProductData from "../fullProductData";

function Type() {
  const [isActive, setIsActive] = useState(false);

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const typesData = [];

    for (let product of fullProductData) {
      typesData.push(product.type);
    }

    const types = [...new Set(typesData)];

    return types.map((type, index) => (
      <div className={classes.container}>
        <label htmlFor={`type${index}`}>
          {type}
          <input type="checkbox" id={`type${index}`}></input>
          <span className={classes.checkmark}></span>
        </label>
      </div>
    ));
  }

  return (
    <>
      <span>Type</span>
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

export default Type;
