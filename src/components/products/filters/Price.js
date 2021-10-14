import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Price.module.scss';

function Price() {
    const [isActive, setIsActive] = useState(false);

    function clickHandler() {
        if (isActive === false) setIsActive(true);
        else setIsActive(false);
    }

    function Inputs() {
        return (
            <div className={classes.container}>
                <label htmlFor='from'>From</label>
                <input type='text' value='0' min='0' max='999' id='from'></input>
                <label htmlFor='to'>To</label>
                <input type='text' value='999' min='0' max='999' id='to'></input>
            </div>
        );
    }

  return (
    <>
      <span>Price</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      {isActive && <div className={classes.dropdown}><Inputs /></div>}
    </>
  );
}

export default Price;
