import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Season.module.scss";
import fullProductData from "../fullProductData";

function Season() {
  const [isActive, setIsActive] = useState(false);

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const seasonsData = [];

    for (let product of fullProductData) {
      seasonsData.push(product.season);
    }

    const seasons = [...new Set(seasonsData.sort())];

    return seasons.map((season, index) => (
      <div className={classes.container}>
        <label htmlFor={`season${index}`}>
          {season}
          <input type="checkbox" id={`season${index}`}></input>
          <span className={classes.checkmark}></span>
        </label>
      </div>
    ));
  }

  return (
    <>
      <span>Season</span>
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

export default Season;
