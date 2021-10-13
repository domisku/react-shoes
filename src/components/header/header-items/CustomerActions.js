import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import classes from './CustomerActions.module.scss';

function CustomerActions() {
  return (
    <div className={classes.container}>
      <span>
        <FontAwesomeIcon icon={faUser} className={classes.icon}/>
      </span>
      <span>
        <FontAwesomeIcon icon={faHeart} className={classes.icon}/>
      </span>
      <span>
        <FontAwesomeIcon icon={faCartShopping} className={classes.icon}/>
      </span>
    </div>
  );
}

export default CustomerActions;
