import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Brands.module.scss";
import productData from "../productData";
import { filterActions } from "../../../store";
import { useHistory, useLocation } from "react-router";

function Brands() {
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
    const brandsData = useMemo(() => [], []);

    for (let product of productData) {
      brandsData.push(product.brand);
    }

    const brands = useMemo(() => [...new Set(brandsData)], [brandsData]);

    const [activeBrands, setActiveBrands] = useState([]);
    const [isChecked, setIsChecked] = useState(
      new Array(brands.length).fill(false)
    );

    useEffect(() => {
      setActiveBrands(query.getAll("brand"));
      const updatedIsChecked = new Array(brands.length).fill(false);

      const queryValues = [];

      for (let value of query.values()) {
        queryValues.push(value);
      }

      brands.forEach((brand, index) => {
        if (queryValues.includes(brand)) updatedIsChecked[index] = true;
      });

      setIsChecked(updatedIsChecked);
    }, [brands]);

    function onChangeHandler(position, event) {
      const updatedIsChecked = isChecked.map((brandIsChecked, index) => {
        return index === position ? !brandIsChecked : brandIsChecked;
      });

      if (updatedIsChecked[position]) {
        setActiveBrands((previous) => [...previous, event.target.name]);
        query.append("brand", event.target.name);
      } else {
        setActiveBrands((previous) =>
          previous.filter((brand) => brand !== event.target.name)
        );
        deleteQuery(event.target.name);
      }

      setIsChecked(updatedIsChecked);
      setActiveBrands(query.getAll("brand"));

      function deleteQuery(name) {
        const brandQueries = query
          .getAll("brand")
          .filter((brand) => brand !== name);
        query.delete("brand");
        for (let brandQuery of brandQueries) query.append("brand", brandQuery);
      }

      history.push(`/products?${query}`);
    }

    const noFilter = useRef(brands);
    useEffect(() => {
      if (!query.get("brand"))
        dispatch(filterActions.updateBrand({ brands: noFilter.current }));
      else dispatch(filterActions.updateBrand({ brands: activeBrands }));
    }, [activeBrands]);

    return (
      <>
        {brands.map((brand, index) => (
          <div className={classes.container} key={`brand${index}`}>
            <label htmlFor={`brand${index}`}>
              {brand}
              <input
                name={brand}
                type="checkbox"
                id={`brand${index}`}
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
      <span>Brands</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      <div className={`${classes.dropdown} ${isActive && classes.active}`}>
        <Checkbox />
      </div>
    </>
  );
}

export default Brands;
