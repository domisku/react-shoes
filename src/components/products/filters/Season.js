import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Season.module.scss";
import productData from "../productData";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";

function Season() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  function clickHandler() {
    if (isActive === false) setIsActive(true);
    else setIsActive(false);
  }

  function Checkbox() {
    const [activeSeasons, setActiveSeasons] = useState([]);

    const seasonsData = [];

    for (let product of productData) {
      seasonsData.push(product.season);
    }

    const seasons = [...new Set(seasonsData.sort())];

    function onChange(event) {
        if (event.target.checked) {
            setActiveSeasons((previous => [...previous, event.target.name]));
        } else {
            setActiveSeasons((previous) => previous.filter(season => season !== event.target.name))
        }
    }

    const noFilter = useRef(seasons);
    useEffect(() => {
        if (!activeSeasons[0]) dispatch(filterActions.updateSeason({seasons: noFilter.current}));
        else dispatch(filterActions.updateSeason({seasons: activeSeasons}));
    }, [activeSeasons]);

    return seasons.map((season, index) => (
      <div className={classes.container}>
        <label htmlFor={`season${index}`}>
          {season}
          <input name={season} type="checkbox" id={`season${index}`} onChange={onChange}></input>
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
        <div className={`${classes.dropdown} ${isActive && classes.active}`}>
          <Checkbox />
        </div>
    </>
  );
}

export default Season;
