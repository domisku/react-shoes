import classes from './Card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Card(props) {
    return (
        <div className={classes.container}>
            <img src={props.image} alt='shoe'></img>
            <FontAwesomeIcon icon={faHeart} className={classes.icon}/>
            <div className={classes['card-footer']}>
                <div className={classes.special}>{props.special}</div>
                <h4 className={classes.brand}>{props.brand}</h4>
                <div className={classes.model}>{props.model}</div>
                <div className={classes.price}>{props.price} &euro;</div>
            </div>
        </div>
    );
}

export default Card;