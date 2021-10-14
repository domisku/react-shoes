import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Gender.module.scss';

function Gender() {
    const [isActive, setIsActive] = useState(false);

    function clickHandler() {
        if (isActive === false) setIsActive(true);
        else setIsActive(false);
    }

  return (
    <>
      <span>Gender</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      {isActive && <div className={classes.dropdown}>a</div>}
    </>
  );
}

export default Gender;