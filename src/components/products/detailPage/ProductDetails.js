import classes from './ProductDetails.module.scss';
import { useParams } from 'react-router-dom';
import productData from '../productData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart, faShieldBlank, faTruckFast, faWallet } from '@fortawesome/free-solid-svg-icons';

function ProductDetails() {
    const params = useParams();

    const details = productData.filter((product) => product.model === params.productId)[0];

    console.log(details.image)

    return (
        <div className={classes.container}>
            <div className={classes['img-container']}>
                <img src={details.image} alt='shoe'></img>
            </div>
            <div className={classes['details-container']}>
                <h2>{details.brand}</h2>
                <p className={classes.model}>{details.model}</p>
                <p className={classes.price}>{details.price} &euro;</p>
                <p>{details.size}</p>
                <button className={classes['button-to-cart']}>Add to Cart</button>
                <button className={classes['button-heart']}><FontAwesomeIcon icon={faHeart} className={classes.icon}/></button>
                <div> 
                    <FontAwesomeIcon className={classes.icon} icon={faCheck} />
                    <span>Dispatch immediately!</span>
                </div>
                <div>
                    <FontAwesomeIcon className={classes.icon} icon={faShieldBlank} />
                    <span>Safe Transaction</span>
                </div>
                <div>
                    <FontAwesomeIcon className={classes.icon} icon={faTruckFast} />
                    <span>Free Shipping and Returns</span>
                </div>
                <div>
                    <FontAwesomeIcon className={classes.icon} icon={faWallet} />
                    <span>Various Payment Methods</span>
                </div>
            </div>
        </div>
    );

}

export default ProductDetails;