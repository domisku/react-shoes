import classes from './Cart.module.scss';
import productData from '../products/productData';
import { useState, useEffect } from 'react';

function Cart() {
    const [cartData, setCartData] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DBisEmpty, setDBisEmpty] = useState(false);


    useEffect(() => {async function getCartItems() {
        const idToken = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        try {
        setIsLoading(true);
        const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/cart.json?auth=${idToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        
        if (Object.keys(data).length) setCartData(data);
        console.log('get RAAAN')
        

        const dataWithoutId = [];
    
       

       for (let key in data) {
           dataWithoutId.push(data[key]);
       }


        setFilteredData(dataWithoutId);

        
        console.log('Success:', data);
        } catch (error) {
            console.log('Error:', error);
            setDBisEmpty(true);
        }
        setIsLoading(false);
      }
      getCartItems()}
      , []);

      async function removeFromCart(event) {
        event.preventDefault();
        const id = event.target.id;

        console.log(event.target.id);

        let keyInDatabase;

        for (let key in cartData) {
            if (`${cartData[key].model}${cartData[key].size}`=== id) {
                keyInDatabase = key;
            }
        }

        const idToken = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        
        try {
        const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/cart/${keyInDatabase}.json?auth=${idToken}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();

        if (filteredData.length === 1) setDBisEmpty(true);

        setFilteredData(filteredData.filter((product) => (product.size !== cartData[keyInDatabase].size) ||
         (product.model !== cartData[keyInDatabase].model)));
        

        console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
      }

    return (
        <>
            {cartData && <div className={classes.container}>
                <h3 className={classes.heading}>Cart</h3>
                {filteredData.map((product, index) => <div className={classes.wrapper}>
                    <div className={classes['img-container']}>
                        <img className={classes.image} src={product.image} alt='shoe'/>
                    </div>
                    <div className={classes['details-container']}>
                        <h2 className={classes.brand}>{product.brand}</h2>
                        <span className={classes.model}>{product.model}</span>
                        <span className={classes.price}>{product.price} &euro;</span>
                        <span className={classes.size}>Size: {product.size}</span>
                    </div>
                    <button className={classes['remove-button']} id={`${product.model}${product.size}`} onClick={removeFromCart}>&times;</button>
                </div>)}
                {!DBisEmpty && <button className={classes['order-button']}>Order</button>}
            </div>}
            {isLoading && <div className={classes['loading-wrapper']}><div className={classes["lds-facebook"]}><div></div><div></div><div></div></div></div>}
            {DBisEmpty && <div className={classes.container}><span className={classes['empty-list']}>Your cart is empty.</span></div>}
        </>
    );
}

export default Cart;