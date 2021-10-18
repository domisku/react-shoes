import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Size.module.scss";
import productData from "../productData";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";

function Size() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  
  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const [activeSizes, setActiveSizes] = useState([]);

    const sizesData = [];

    for (let product of productData) {
      sizesData.push(...product.size);
    }

    const sizes = [...new Set(sizesData.sort())];

    function onChange(event) {
        if (event.target.checked) {
            setActiveSizes((previous => [...previous, event.target.name]));
        } else {
            setActiveSizes((previous) => previous.filter(size => size !== event.target.name))
        }
    }

    const noFilter = useRef(sizes);
    useEffect(() => {
        if (!activeSizes[0]) dispatch(filterActions.updateSize({sizes: noFilter.current}));
        else dispatch(filterActions.updateSize({sizes: activeSizes.map(size => +size)}));
    }, [activeSizes]);

    return sizes.map((size, index) => (
      <div className={classes.container}>
        <label htmlFor={`size${index}`}>
          {size}
          <input name={size} type="checkbox" id={`size${index}`} onChange={onChange}></input>
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
        <div className={`${classes.dropdown} ${isActive && classes.active}`}>
          <Checkbox />
        </div>
    </>
  );
}

export default Size;
