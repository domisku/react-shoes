import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Size.module.scss";
import productData from "../productData";
import { filterActions } from "../../../store";
import { useHistory, useLocation } from "react-router";

function Size() {
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
    const sizesData = useMemo(() => [], []);

    for (let product of productData) {
      sizesData.push(...product.size);
    }

    const sizes = useMemo(() => [...new Set(sizesData.sort())], [sizesData]);

    const [activeSizes, setActiveSizes] = useState([]);
    const [isChecked, setIsChecked] = useState(
      new Array(sizes.length).fill(false)
    );

    useEffect(() => {
      setActiveSizes(query.getAll("size"));

      const updatedIsChecked = new Array(sizes.length).fill(false);

      const queryValues = [];

      for (let value of query.values()) {
        queryValues.push(value);
      }

      sizes.forEach((size, index) => {
        if (queryValues.includes(size.toString()))
          updatedIsChecked[index] = true;
      });
      setIsChecked(updatedIsChecked);
    }, [sizes]);

    function onChangeHandler(position, event) {
      const updatedIsChecked = isChecked.map((sizeIsChecked, index) => {
        return index === position ? !sizeIsChecked : sizeIsChecked;
      });

      if (updatedIsChecked[position]) {
        setActiveSizes((previous) => [...previous, event.target.name]);
        query.append("size", event.target.name);
      } else {
        setActiveSizes((previous) =>
          previous.filter((size) => size !== event.target.name)
        );
        deleteQuery(event.target.name);
      }

      setIsChecked(updatedIsChecked);
      setActiveSizes(query.getAll("size"));

      function deleteQuery(name) {
        const sizeQueries = query
          .getAll("size")
          .filter((size) => size !== name);
        query.delete("size");
        for (let sizeQuery of sizeQueries) query.append("size", sizeQuery);
      }

      history.push(`/products?${query}`);
    }

    const noFilter = useRef(sizes);
    useEffect(() => {
      if (!query.get("size"))
        dispatch(filterActions.updateSize({ sizes: noFilter.current }));
      else
        dispatch(
          filterActions.updateSize({ sizes: activeSizes.map((size) => +size) })
        );
    }, [activeSizes]);

    return (
      <>
        {sizes.map((size, index) => (
          <div className={classes.container} key={`size${index}`}>
            <label htmlFor={`size${index}`}>
              {size}
              <input
                name={size}
                type="checkbox"
                id={`size${index}`}
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
      <span>Sizes</span>
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
