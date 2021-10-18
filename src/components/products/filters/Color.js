import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Color.module.scss";
// import fullProductData from "../fullProductData";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";
import productData from "../productData";

function Color() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const [activeColors, setActiveColors] = useState([]);

    const colorData = [];

    for (let product of productData) {
      colorData.push(product.color);
    }

    const colors = [...new Set(colorData.sort())];

    function onChange(event) {
        if (event.target.checked) {
            setActiveColors((previous => [...previous, event.target.name]));
        } else {
            setActiveColors((previous) => previous.filter(color => color !== event.target.name))
        }
    }

    const noFilter = useRef(colors);
    useEffect(() => {
        if (!activeColors[0]) dispatch(filterActions.updateColor({colors: noFilter.current}));
        else dispatch(filterActions.updateColor({colors: activeColors}));
    }, [activeColors]);

    return colors.map((color, index) => (
      <div className={classes.container}>
        <label htmlFor={`color${index}`}>
          {color}
          <input name={color} type="checkbox" id={`color${index}`} onChange={onChange}></input>
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
      
        <div className={`${classes.dropdown} ${isActive && classes.active}`}>
          <Checkbox />
        </div>
      
    </>
  );
}

export default Color;
