import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import classes from './CustomerActions.module.scss';
import Modal from '../../UI/Modal';
import { useState } from 'react';
import Login from '../../user/Login';

function CustomerActions() {
  const [userPageIsShown, setUserPageIsShown] = useState(false);

  function toggleUserPage() {
    setUserPageIsShown(true);
  }

  return (
    <div className={classes.container}>
      <span onClick={toggleUserPage}>
        <FontAwesomeIcon icon={faUser} className={classes.icon}/>
      </span>
      <span>
        <FontAwesomeIcon icon={faHeart} className={classes.icon}/>
      </span>
      <span>
        <FontAwesomeIcon icon={faCartShopping} className={classes.icon}/>
      </span>
      {userPageIsShown && <Modal><Login /></Modal>}
    </div>
  );
}

export default CustomerActions;
