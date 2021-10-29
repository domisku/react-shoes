import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Season.module.scss";
import productData from "../productData";
import { filterActions } from "../../../store";
import { useHistory, useLocation } from "react-router";

function Season() {
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

  function Checkbox() {
    const seasonsData = useMemo(() => [], []);

    for (let product of productData) {
      seasonsData.push(product.season);
    }

    const seasons = useMemo(() => [...new Set(seasonsData)], [seasonsData]);

    const [activeSeasons, setActiveSeasons] = useState([]);
    const [isChecked, setIsChecked] = useState(
      new Array(seasons.length).fill(false)
    );

    useEffect(() => {
      setActiveSeasons(query.getAll("season"));
      const updatedIsChecked = new Array(seasons.length).fill(false);

      const queryValues = [];

      for (let value of query.values()) {
        queryValues.push(value);
      }

      seasons.forEach((season, index) => {
        if (queryValues.includes(season)) updatedIsChecked[index] = true;
      });

      setIsChecked(updatedIsChecked);
    }, [seasons]);

    function onChangeHandler(position, event) {
      const updatedIsChecked = isChecked.map((seasonIsChecked, index) => {
        return index === position ? !seasonIsChecked : seasonIsChecked;
      });

      if (updatedIsChecked[position]) {
        setActiveSeasons((previous) => [...previous, event.target.name]);
        query.append("season", event.target.name);
      } else {
        setActiveSeasons((previous) =>
          previous.filter((season) => season !== event.target.name)
        );
        deleteQuery(event.target.name);
      }

      setIsChecked(updatedIsChecked);
      setActiveSeasons(query.getAll("season"));

      function deleteQuery(name) {
        const seasonQueries = query
          .getAll("season")
          .filter((season) => season !== name);
        query.delete("season");
        for (let seasonQuery of seasonQueries)
          query.append("season", seasonQuery);
      }

      history.push(`/products?${query}`);
    }

    const noFilter = useRef(seasons);
    useEffect(() => {
      if (!query.get("season"))
        dispatch(filterActions.updateSeason({ seasons: noFilter.current }));
      else dispatch(filterActions.updateSeason({ seasons: activeSeasons }));
    }, [activeSeasons]);

    return (
      <>
        {seasons.map((season, index) => (
          <div className={classes.container} key={`season${index}`}>
            <label htmlFor={`season${index}`}>
              {season}
              <input
                name={season}
                type="checkbox"
                id={`season${index}`}
                checked={isChecked[index]}
                onChange={(event) => onChangeHandler(index, event)}
              ></input>
              <span className={classes.checkmark}></span>
            </label>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <span>Seasons</span>
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
