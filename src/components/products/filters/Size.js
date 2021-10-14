import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Size.module.scss';

function Size() {
    const [isActive, setIsActive] = useState(false);

    function clickHandler() {
        if (isActive === false) setIsActive(true);
        else setIsActive(false);
    }

  return (
    <>
      <span>Size</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      {isActive && <div className={classes.dropdown}>a</div>}
    </>
  );
}

export default Size;