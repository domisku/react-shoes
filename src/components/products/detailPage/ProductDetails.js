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
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

let keyInDatabase;

function ProductDetails() {
  const params = useParams();
  let modalClosed = useSelector((state) => state.auth.modalClosed);
  console.log(modalClosed)

  const [isInFavourites, setIsInFavourites] = useState(false);

  const details = productData.filter(
    (product) => product.model === params.productId
  )[0];

  const options = details.size.map((size) => ({ value: size, label: size }));

  async function addToFavourites() {
    const idToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    try {
    const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/liked.json?auth=${idToken}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
              },
              body: JSON.stringify({model: details.model})
    });
    const data = await response.json();

    setIsInFavourites(true);
    
    console.log('Success:', data);
    } catch (error) {
         console.error('Error:', error);
     }
  }


  useEffect(() => {async function getFavourites() {
    const idToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    console.log('get ran again')

    try {
    const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/liked.json?auth=${idToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    const models = Object.values(data);

    console.log(data)

    let objKey, nestedKey;
    let name = details.model;

    for (let key in data) {
      for (let key2 in data[key]) {
        if (data[key][key2] === name) {
          objKey = key;
          nestedKey = key2;
        }
      }
    }

    keyInDatabase = objKey;

    console.log(objKey, nestedKey);

    if (models.some((product) => product.model === details.model)) {
      setIsInFavourites(true)
    } else setIsInFavourites(false);
    
    console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
        setIsInFavourites(false);
    }
  }
  getFavourites();
  }, [details.model, modalClosed]);

  async function removeFromFavourites() {
    console.log(`remove did trigger ${keyInDatabase}`);
    const idToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    try {
    const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/liked/${keyInDatabase}.json?auth=${idToken}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();

    setIsInFavourites(false);
    
    console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
  }

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
            {!isInFavourites && <button className={classes["button-heart"]} onClick={addToFavourites}>
            <FontAwesomeIcon icon={faHeart} className={classes.icon} />
            </button>}
            {isInFavourites && <button className={classes["button-heart-active"]} onClick={removeFromFavourites}>
            <FontAwesomeIcon icon={faHeart} className={classes.icon} />
            </button>}
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
