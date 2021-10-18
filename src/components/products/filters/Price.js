import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Price.module.scss';
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";

function Price() {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    function clickHandler() {
        if (isActive === false) setIsActive(true);
        else setIsActive(false);
    }

    function Inputs() {
        const [minValue, setMinValue] = useState(0);
        const [maxValue, setMaxValue] = useState(999);

        function minInputHandler(event) {
            setMinValue(event.target.value);
        }

        function maxInputHandler(event) {
            setMaxValue(event.target.value);
        }

        useEffect(() => {
            dispatch(filterActions.updatePrice({ prices: [+minValue, +maxValue] }));
        }, [minValue, maxValue]);

        return (
            <div className={classes.container}>
                <label htmlFor='from'>From</label>
                <input type='number' value={minValue} onInput={minInputHandler} min='0' max='999' id='from'></input>
                <label htmlFor='to'>To</label>
                <input type='number' value={maxValue} onInput={maxInputHandler} min='0' max='999' id='to'></input>
            </div>
        );
    }

  return (
    <>
      <span>Price</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      <div className={`${classes.dropdown} ${isActive && classes.active}`}><Inputs /></div>
    </>
  );
}

export default Price;
