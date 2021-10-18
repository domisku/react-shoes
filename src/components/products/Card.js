import classes from './Card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Card(props) {
    return (
        
            <div className={classes.container}>
                <Link className={classes.link} to={`/product-details/${props.model}`}>
                    <img src={props.image} alt='shoe'></img>
                    <div className={classes['card-footer']}>
                        <div className={classes.special}>{props.special}</div>
                        <h4 className={classes.brand}>{props.brand}</h4>
                        <div className={classes.model}>{props.model}</div>
                        <div className={classes.price}>{props.price} &euro;</div>
                    </div>
                </Link>
                <FontAwesomeIcon icon={faHeart} className={classes.icon}/>
            </div>
        
    );
}

export default Card;