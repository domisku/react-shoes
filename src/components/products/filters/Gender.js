import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Gender.module.scss";
import fullProductData from "../fullProductData";

function Gender() {
  const [isActive, setIsActive] = useState(false);

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const genderData = [];

    for (let product of fullProductData) {
      genderData.push(product.gender);
    }

    const gender = [...new Set(genderData)];

    return gender.map((gender, index) => (
      <div className={classes.container}>
        <label htmlFor={`gender${index}`}>
          {gender}
          <input type="checkbox" id={`gender${index}`}></input>
          <span className={classes.checkmark}></span>
        </label>
      </div>
    ));
  }

  return (
    <>
      <span>Gender</span>
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

export default Gender;
