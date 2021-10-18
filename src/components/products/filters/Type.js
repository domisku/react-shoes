import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Type.module.scss";
import productData from "../productData";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";

function Type() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const [activeTypes, setActiveTypes] = useState([]);

    const typesData = [];

    for (let product of productData) {
      typesData.push(product.type);
    }

    const types = [...new Set(typesData)];

    function onChange(event) {
        if (event.target.checked) {
            setActiveTypes((previous => [...previous, event.target.name]));
        } else {
            setActiveTypes((previous) => previous.filter(type => type !== event.target.name))
        }
    }

    const noFilter = useRef(types);
    useEffect(() => {
        if (!activeTypes[0]) dispatch(filterActions.updateType({types: noFilter.current}));
        else dispatch(filterActions.updateType({types: activeTypes}));
    }, [activeTypes]);

    return types.map((type, index) => (
      <div className={classes.container}>
        <label htmlFor={`type${index}`}>
          {type}
          <input name={type} type="checkbox" id={`type${index}`} onChange={onChange}></input>
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
        <div className={`${classes.dropdown} ${isActive && classes.active}`}>
          <Checkbox />
        </div>
    </>
  );
}

export default Type;
