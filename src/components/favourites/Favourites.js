import classes from "./Favourites.module.scss";
import productData from "../products/productData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favourites(props) {
  const [favouritesData, setFavouritesData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [DBisEmpty, setDBisEmpty] = useState(false);

  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    async function getFavourites() {
      const idToken = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      try {
        setIsLoading(true);

        const response = await fetch(
          `https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/liked.json?auth=${idToken}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (Object.keys(data).length) setFavouritesData(data);

        const likedModels = [];

        for (let key in data) {
          likedModels.push(data[key].model);
        }

        setFilteredData(
          productData.filter((product) => likedModels.includes(product.model))
        );
      } catch (error) {
        console.log("Error:", error);
        setDBisEmpty(true);
      }
      setIsLoading(false);
    }
    if (isLoggedIn) getFavourites();
  }, [isLoggedIn]);

  async function removeFavourite(event) {
    event.stopPropagation();
    event.preventDefault();
    const id = event.target.id;

    let keyInDatabase;

    for (let key in favouritesData) {
      if (favouritesData[key].model === id) {
        keyInDatabase = key;
      }
    }

    const idToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      await fetch(
        `https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/liked/${keyInDatabase}.json?auth=${idToken}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (filteredData.length === 1) setDBisEmpty(true);

      setFilteredData(
        filteredData.filter(
          (product) => product.model !== favouritesData[keyInDatabase].model
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <h3 className={classes.heading}>Favourites</h3>
      {favouritesData && (
        <div className={classes.container}>
          {filteredData.map((product, index) => (
            <Link
              to={`/product-details/${product.model}`}
              key={`favourite${index}`}
              onClick={props.toggleFavouritesPage}
            >
              <div className={classes.wrapper}>
                <div className={classes["img-container"]}>
                  <img
                    className={classes.image}
                    src={product.image}
                    alt="shoe"
                  />
                </div>
                <div className={classes["details-container"]}>
                  <h2 className={classes.brand}>{product.brand}</h2>
                  <span className={classes.model}>{product.model}</span>
                  <span className={classes.price}>{product.price} &euro;</span>
                </div>
                <button
                  className={classes["remove-button"]}
                  id={product.model}
                  onClick={removeFavourite}
                >
                  &times;
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
      {isLoading && (
        <div className={classes["loading-wrapper"]}>
          <div className={classes["lds-facebook"]}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {DBisEmpty && (
        <div className={classes.container}>
          <span className={classes["empty-list"]}>
            Your favourites list is empty.
          </span>
        </div>
      )}
      {!isLoggedIn && (
        <div className={classes.container}>
          <span className={classes["empty-list"]}>
            You must be logged in to see your favourites.
          </span>
        </div>
      )}
    </>
  );
}

export default Favourites;
