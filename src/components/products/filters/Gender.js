import React, { useState, useEffect, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Gender.module.scss";
import productData from "../productData";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";
import { useHistory, useLocation } from "react-router";

function Gender() {
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
    const genderData = useMemo(() => [], []);

    for (let product of productData) {
      genderData.push(product.gender);
    }

    const genders = useMemo(() => [...new Set(genderData)], [genderData]);

    const [activeGenders, setActiveGenders] = useState([]);
    const [isChecked, setIsChecked] = useState(
      new Array(genders.length).fill(false)
    );

    useEffect(() => {
      setActiveGenders(query.getAll("gender"));
      const updatedIsChecked = new Array(genders.length).fill(false);

      const queryValues = [];

      for (let value of query.values()) {
        queryValues.push(value);
      }

      genders.forEach((gender, index) => {
        if (queryValues.includes(gender)) updatedIsChecked[index] = true;
      });

      setIsChecked(updatedIsChecked);
    }, [genders]);

    function onChangeHandler(position, event) {
      const updatedIsChecked = isChecked.map((genderIsChecked, index) => {
        return index === position ? !genderIsChecked : genderIsChecked;
      });

      if (updatedIsChecked[position]) {
        setActiveGenders((previous) => [...previous, event.target.name]);
        query.append("gender", event.target.name);
      } else {
        setActiveGenders((previous) =>
          previous.filter((gender) => gender !== event.target.name)
        );
        deleteQuery(event.target.name);
      }

      setIsChecked(updatedIsChecked);
      setActiveGenders(query.getAll("gender"));

      function deleteQuery(name) {
        const genderQueries = query
          .getAll("gender")
          .filter((gender) => gender !== name);
        query.delete("gender");
        for (let genderQuery of genderQueries)
          query.append("gender", genderQuery);
      }

      history.push(`/products?${query}`);
    }

    const noFilter = useRef(genders);

    useEffect(() => {
      if (!query.get("gender"))
        dispatch(filterActions.updateGender({ genders: noFilter.current }));
      else dispatch(filterActions.updateGender({ genders: activeGenders }));
    }, [activeGenders]);

    return genders.map((gender, index) => (
      <div className={classes.container} key={`gender${index}`}>
        <label htmlFor={`gender${index}`}>
          {gender}
          <input
            name={gender}
            type="checkbox"
            id={`gender${index}`}
            checked={isChecked[index]}
            onChange={(event) => onChangeHandler(index, event)}
          ></input>
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
