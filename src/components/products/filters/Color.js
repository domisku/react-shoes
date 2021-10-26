import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Color.module.scss';
import productData from '../productData';
import { filterActions } from '../../../store';
import { useHistory, useLocation } from "react-router";

function Color() {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
    
    let query = useQuery();

    function clickHandler() {
        setIsActive(!isActive)
    }

    function Checkbox() {
        const colorsData = useMemo(() => [], []);

        for (let product of productData) {
            colorsData.push(product.color);
        }

        const colors = useMemo(() => [...new Set(colorsData)], [colorsData]);

        const [activeColors, setActiveColors] = useState([]);
        const [isChecked, setIsChecked] = useState(new Array(colors.length).fill(false));

        useEffect(() => {
            setActiveColors(query.getAll('color'));
            const updatedIsChecked = new Array(colors.length).fill(false);
      
            const queryValues = [];
      
            for (let value of query.values()) {
              queryValues.push(value);
            }
      
            colors.forEach((color, index) => {
              if (queryValues.includes(color)) updatedIsChecked[index] = true;
            });
      
            setIsChecked(updatedIsChecked);
          }, [colors]);

          function onChangeHandler(position, event) {
            const updatedIsChecked = isChecked.map((colorIsChecked, index) => {
                return index === position ? !colorIsChecked : colorIsChecked;
            });
    
            if (updatedIsChecked[position]) {
                setActiveColors((previous => [...previous, event.target.name]));
                query.append('color', event.target.name);
            } else {
                setActiveColors((previous) => previous.filter(color => color !== event.target.name));
                deleteQuery(event.target.name);
              }
    
            setIsChecked(updatedIsChecked);
            setActiveColors(query.getAll('color'));
    
            function deleteQuery(name) {
              const colorQueries = query.getAll('color').filter(color => color !== name);
              query.delete('color');
              for (let colorQuery of colorQueries) query.append('color', colorQuery);
            }
    
            history.push(`/products?${query}`);
        }

        const noFilter = useRef(colors);
        useEffect(() => {
            if (!query.get('color')) dispatch(filterActions.updateColor({colors: noFilter.current}));
            else dispatch(filterActions.updateColor({colors: activeColors}));
        }, [activeColors]);

        return (
            <>
                {colors.map((color, index) => <div className={classes.container}>
                    <label htmlFor={`color${index}`}>
                        {color}
                        <input key={index} name={color} type='checkbox' id={`color${index}`} checked={isChecked[index]} onChange={(event) => onChangeHandler(index, event)}></input>
                        <span className={classes.checkmark}></span>
                    </label>
                </div>)}
            </>
            )
    }

  return (
    <>
      <span>Colors</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      <div className={`${classes.dropdown} ${isActive && classes.active}`}><Checkbox /></div>
    </>
  );
}


export default Color;
