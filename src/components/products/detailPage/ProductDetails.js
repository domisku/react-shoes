import classes from "./ProductDetails.module.scss";
import { useParams } from "react-router-dom";
import productData from "../productData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHeart,
  faShieldBlank,
  faTruckFast,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

function ProductDetails() {
  const params = useParams();

  const details = productData.filter(
    (product) => product.model === params.productId
  )[0];

  const options = details.size.map((size) => ({ value: size, label: size }));

  return (
    <div className={classes.container}>
      <div className={classes["img-container"]}>
        <img src={details.image} alt="shoe"></img>
      </div>
      <div className={classes["details-container"]}>
        <h2>{details.brand}</h2>
        <p className={classes.model}>{details.model}</p>
        <p className={classes.price}>{details.price} &euro;</p>
        <Select
          className={classes.select}
          placeholder="Select Size"
          options={options}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#EFEFEF",
              primary: "black",
              neutral20: 'black',
              neutral50: 'black',
              neutral80: 'black',
              neutral10: 'black',
              neutral5: 'black',
              neutral30: 'black',
              neutral60: 'black',
              neutral90: 'black',
              neutral40: 'black',
              neutral70: 'black'
            },
          })}
        />
        <div className={classes['button-container']}>
            <button className={classes["button-to-cart"]}>Add to Cart</button>
            <button className={classes["button-heart"]}>
            <FontAwesomeIcon icon={faHeart} className={classes.icon} />
            </button>
        </div>
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
