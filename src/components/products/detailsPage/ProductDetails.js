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
import { useSelector } from "react-redux";

let keyInDatabase;
let keyInCartDatabase;

function ProductDetails() {
  const params = useParams();
  let modalClosed = useSelector((state) => state.auth.modalClosed);

  const [isInFavourites, setIsInFavourites] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isSizeSelected, setIsSizeSelected] = useState(true);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);

  const isLoggedIn = localStorage.getItem("token");

  const details = productData.filter(
    (product) => product.model === params.productId
  )[0];

  const options = details.size.map((size) => ({ value: size, label: size }));

  useEffect(() => {
    setError(false);
  }, [isLoggedIn]);

  async function addToFavourites() {
    const idToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE_URI}/users/${username}/liked.json?auth=${idToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model: details.model }),
        }
      );
      const data = await response.json();

      keyInDatabase = data.name;

      setIsInFavourites(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    async function getFavourites() {
      const idToken = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_DATABASE_URI}/users/${username}/liked.json?auth=${idToken}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const models = Object.values(data);

        let objKey;
        let name = details.model;

        for (let key in data) {
          for (let key2 in data[key]) {
            if (data[key][key2] === name) {
              objKey = key;
            }
          }
        }

        keyInDatabase = objKey;

        if (models.some((product) => product.model === details.model)) {
          setIsInFavourites(true);
        } else setIsInFavourites(false);
      } catch (error) {
        console.error("Error:", error);
        setIsInFavourites(false);
      }
    }
    getFavourites();
  }, [details.model, modalClosed]);

  async function removeFromFavourites() {
    const idToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      await fetch(
        `${process.env.REACT_APP_DATABASE_URI}/users/${username}/liked/${keyInDatabase}.json?auth=${idToken}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsInFavourites(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    async function getQuantity() {
      const idToken = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_DATABASE_URI}/users/${username}/cart.json?auth=${idToken}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        let objKey, quantityInDB;
        let currentModel = details.model;

        for (let key in data) {
          if (
            data[key].model === currentModel &&
            data[key].size === selectedSize
          ) {
            objKey = key;
            quantityInDB = data[key].quantity;
          }
        }

        keyInCartDatabase = objKey;

        setQuantity(quantityInDB);
        setObjectId(keyInCartDatabase);
      } catch (error) {
        console.error("Error:", error);
        setIsInFavourites(false);
      }
    }
    getQuantity();
  }, [details.model, modalClosed, selectedSize]);

  function addToCartHandler() {
    if (!alert) {
      if (quantity) updateQuantity();
      else if (selectedSize) addToCart();
      else setIsSizeSelected(false);
    }
  }

  async function addToCart() {
    const idToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE_URI}/users/${username}/cart.json?auth=${idToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: details.model,
            brand: details.brand,
            price: details.price,
            image: details.image,
            size: selectedSize,
            quantity: 1,
          }),
        }
      );
      const data = await response.json();

      setObjectId(data.name);
      setQuantity(1);

      setAlert(true);
      setTimeout(() => setAlert(false), 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateQuantity() {
    const idToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE_URI}/users/${username}/cart/${objectId}.json?auth=${idToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: quantity + 1 }),
        }
      );
      const data = await response.json();

      setQuantity(data.quantity);

      keyInCartDatabase = data.name;

      setAlert(true);
      setTimeout(() => setAlert(false), 1000);
    } catch (error) {
      console.error("Error:", error);
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
        {!isSizeSelected && (
          <span className={classes.error}>Please select a size</span>
        )}
        <Select
          className={classes.select}
          onChange={(event) => {
            setIsSizeSelected(true);
            setSelectedSize(event.value);
          }}
          placeholder="Select Size"
          options={options}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#EFEFEF",
              primary: "black",
              neutral20: "black",
              neutral50: "black",
              neutral80: "black",
              neutral10: "black",
              neutral5: "black",
              neutral30: "black",
              neutral60: "black",
              neutral90: "black",
              neutral40: "black",
              neutral70: "black",
            },
          })}
        />
        {error && (
          <span className={classes.error}>
            You must be logged in to do that
          </span>
        )}
        <div className={classes["button-container"]}>
          <button
            className={`${classes["button-to-cart"]} ${
              alert ? classes.success : ""
            }`}
            onClick={isLoggedIn ? addToCartHandler : () => setError(true)}
          >
            Add to Cart
          </button>
          {!isInFavourites && (
            <button
              className={classes["button-heart"]}
              onClick={isLoggedIn ? addToFavourites : () => setError(true)}
            >
              <FontAwesomeIcon icon={faHeart} className={classes.icon} />
            </button>
          )}
          {isInFavourites && (
            <button
              className={classes["button-heart-active"]}
              onClick={removeFromFavourites}
            >
              <FontAwesomeIcon icon={faHeart} className={classes.icon} />
            </button>
          )}
        </div>
        <div>
          <FontAwesomeIcon className={classes.icon} icon={faCheck} />
          <span>Dispatch Immediately!</span>
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
