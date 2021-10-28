import classes from './Card.module.scss';
import { Link } from 'react-router-dom';

function Card(props) {
    return (
        
            <div className={classes.container}>
                <Link className={classes.link} to={`/product-details/${props.model}`}>
                    <img src={props.image} alt='shoe'></img>
                    <div className={classes['card-footer']}>
                        {props.special && <div className={classes.special}>{props.special}</div>}
                        <h4 className={classes.brand}>{props.brand}</h4>
                        <div className={classes.model}>{props.model}</div>
                        <div className={classes.price}>{props.price} &euro;</div>
                    </div>
                </Link>
            </div>
        
    );
}

export default Card;