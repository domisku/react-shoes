import classes from './Favourites.module.scss';
import productData from '../products/productData';
import { useState, useEffect } from 'react';


function Favourites() {
    const [favouritesData, setFavouritesData] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DBisEmpty, setDBisEmpty] = useState(false);

    useEffect(() => {async function getFavourites() {
        const idToken = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        try {
        setIsLoading(true);
        const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/liked.json?auth=${idToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (Object.keys(data).length) setFavouritesData(data);
        
        
        const likedModels = [];
    
        for (let key in data) {
            likedModels.push(data[key].model) 
        }

        setFilteredData(productData.filter((product) => likedModels.includes(product.model)));
        
        console.log('Success:', data);
        } catch (error) {
            console.log('Error:', error);
            setDBisEmpty(true);
        }
        setIsLoading(false);
      }
      getFavourites()}
      , []);

      async function removeFavourite(event) {
        event.preventDefault();
        const id = event.target.id;

        console.log(event.target.id);

        let keyInDatabase;

        for (let key in favouritesData) {
            if (favouritesData[key].model === id) {
                keyInDatabase = key;
            }
        }

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

        if (filteredData.length === 1) setDBisEmpty(true);
    
        setFilteredData(filteredData.filter((product) => product.model !== favouritesData[keyInDatabase].model));

        console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
      }

    //   Object.keys(favouritesData)[index].toString()

    return (
        <>
            {favouritesData && <div className={classes.container}>
                {filteredData.map((product, index) => <div className={classes.wrapper}>
                    <div className={classes['img-container']}>
                        <img className={classes.image} src={product.image} alt='shoe'/>
                    </div>
                    <div className={classes['details-container']}>
                        <h2 className={classes.brand}>{product.brand}</h2>
                        <span className={classes.model}>{product.model}</span>
                        <span className={classes.price}>{product.price} &euro;</span>
                    </div>
                    <button className={classes['remove-button']} id={product.model} onClick={removeFavourite}>&times;</button>
                </div>)}
            </div>}
            {isLoading && <div className={classes['loading-wrapper']}><div className={classes["lds-facebook"]}><div></div><div></div><div></div></div></div>}
            {DBisEmpty && <div className={classes.container}><span className={classes['empty-list']}>Your favourites list is empty.</span></div>}
        </>
    );
}

export default Favourites;