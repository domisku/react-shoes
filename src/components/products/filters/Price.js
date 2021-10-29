import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Price.module.scss";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";
import { useHistory, useLocation } from "react-router";

function Price() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  function clickHandler() {
    setIsActive(!isActive);
  }

  function Inputs() {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(999);

    function minInputHandler(event) {
      setMinValue(event.target.value.replace(/[\D]/g, ""));
    }

    function maxInputHandler(event) {
      setMaxValue(event.target.value.replace(/[\D]/g, ""));
    }

    function inputBlurHandler() {
      dispatch(filterActions.updatePrice({ prices: [+minValue, +maxValue] }));
      query.delete("minPrice");
      query.append("minPrice", minValue);
      query.delete("maxPrice");
      query.append("maxPrice", maxValue);
      history.push(`/products?${query}`);
    }

    useEffect(() => {
      dispatch(
        filterActions.updatePrice({
          prices: [query.get("minPrice") || 0, query.get("maxPrice") || 999],
        })
      );
      query.get("minPrice")
        ? setMinValue(query.get("minPrice"))
        : setMinValue(0);
      query.get("maxPrice")
        ? setMaxValue(query.get("maxPrice"))
        : setMaxValue(999);
    }, []);

    return (
      <div className={classes.container}>
        <input
          type="text"
          value={minValue}
          onInput={minInputHandler}
          onBlur={inputBlurHandler}
          onKeyPress={(event) => event.key === "Enter" && inputBlurHandler()}
          min="0"
          max="999"
          id="from"
        ></input>
        <span>&#x02500;</span>
        <input
          type="text"
          value={maxValue}
          onInput={maxInputHandler}
          onBlur={inputBlurHandler}
          onKeyPress={(event) => event.key === "Enter" && inputBlurHandler()}
          min="0"
          max="999"
          id="to"
        ></input>
      </div>
    );
  }

  return (
    <>
      <span>Price (&euro;)</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      <div className={`${classes.dropdown} ${isActive && classes.active}`}>
        <Inputs />
      </div>
    </>
  );
}

export default Price;
