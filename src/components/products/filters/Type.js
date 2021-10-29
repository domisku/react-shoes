import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Type.module.scss";
import productData from "../productData";
import { filterActions } from "../../../store";
import { useHistory, useLocation } from "react-router";

function Type() {
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
    const typesData = useMemo(() => [], []);

    for (let product of productData) {
      typesData.push(product.type);
    }

    const types = useMemo(() => [...new Set(typesData)], [typesData]);

    const [activeTypes, setActiveTypes] = useState([]);
    const [isChecked, setIsChecked] = useState(
      new Array(types.length).fill(false)
    );

    useEffect(() => {
      setActiveTypes(query.getAll("type"));
      const updatedIsChecked = new Array(types.length).fill(false);

      const queryValues = [];

      for (let value of query.values()) {
        queryValues.push(value);
      }

      types.forEach((type, index) => {
        if (queryValues.includes(type)) updatedIsChecked[index] = true;
      });

      setIsChecked(updatedIsChecked);
    }, [types]);

    function onChangeHandler(position, event) {
      const updatedIsChecked = isChecked.map((typeIsChecked, index) => {
        return index === position ? !typeIsChecked : typeIsChecked;
      });

      if (updatedIsChecked[position]) {
        setActiveTypes((previous) => [...previous, event.target.name]);
        query.append("type", event.target.name);
      } else {
        setActiveTypes((previous) =>
          previous.filter((type) => type !== event.target.name)
        );
        deleteQuery(event.target.name);
      }

      setIsChecked(updatedIsChecked);
      setActiveTypes(query.getAll("type"));

      function deleteQuery(name) {
        const typeQueries = query
          .getAll("type")
          .filter((type) => type !== name);
        query.delete("type");
        for (let typeQuery of typeQueries) query.append("type", typeQuery);
      }

      history.push(`/products?${query}`);
    }

    const noFilter = useRef(types);
    useEffect(() => {
      if (!query.get("type"))
        dispatch(filterActions.updateType({ types: noFilter.current }));
      else dispatch(filterActions.updateType({ types: activeTypes }));
    }, [activeTypes]);

    return (
      <>
        {types.map((type, index) => (
          <div className={classes.container} key={`type${index}`}>
            <label htmlFor={`type${index}`}>
              {type}
              <input
                name={type}
                type="checkbox"
                id={`type${index}`}
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
      <span>Types</span>
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
