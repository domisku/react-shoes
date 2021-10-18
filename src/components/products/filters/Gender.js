import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Gender.module.scss";
import productData from "../productData";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";

function Gender() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const [activeGenders, setActiveGenders] = useState([]);

    const genderData = [];

    for (let product of productData) {
      genderData.push(product.gender);
    }

    const genders = [...new Set(genderData)];

    function onChange(event) {
        if (event.target.checked) {
            setActiveGenders((previous => [...previous, event.target.name]));
        } else {
            setActiveGenders((previous) => previous.filter(gender => gender !== event.target.name))
        }
    }

    const noFilter = useRef(genders);
    useEffect(() => {
        if (!activeGenders[0]) dispatch(filterActions.updateGender({genders: noFilter.current}));
        else dispatch(filterActions.updateGender({genders: activeGenders}));
    }, [activeGenders]);

    return genders.map((gender, index) => (
      <div className={classes.container}>
        <label htmlFor={`gender${index}`}>
          {gender}
          <input name={gender} type="checkbox" id={`gender${index}`} onChange={onChange}></input>
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
        <div className={`${classes.dropdown} ${isActive && classes.active}`}>
          <Checkbox />
        </div>
    </>
  );
}

export default Gender;
