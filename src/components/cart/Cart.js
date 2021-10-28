import classes from './Cart.module.scss';
import { useState, useEffect } from 'react';
import Checkout from './Checkout';

function Cart() {
    const [cartData, setCartData] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DBisEmpty, setDBisEmpty] = useState(false);
    const [quantities, setQuantities] = useState([]);
    const [toCheckout, setToCheckout] = useState(false);

    const isLoggedIn = localStorage.getItem('token');


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
        const quantitiesInDB = [];
    
       

       for (let key in data) {
           dataWithoutId.push(data[key]);
           quantitiesInDB.push(data[key].quantity);
       }


        setFilteredData(dataWithoutId);
        setQuantities(quantitiesInDB);

        
        console.log('Success:', data);
        } catch (error) {
            console.log('Error:', error);
            setDBisEmpty(true);
        }
        setIsLoading(false);
      }
      if (isLoggedIn) getCartItems()}
      , [isLoggedIn]);

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

      async function updateQuantity(event) {
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
        console.log(quantities[event.target])
        console.log(event.target.name);
        console.log(event.target.className);
    
        try {
        const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/${username}/cart/${keyInDatabase}.json?auth=${idToken}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({quantity: event.target.title === 'Add' ? quantities[event.target.name] + 1 : quantities[event.target.name] - 1 })
        });
        const data = await response.json();

        let newQuantities = [...quantities];

        if (event.target.title === 'Add') newQuantities[event.target.name]++;
        else if (event.target.title === 'Remove') newQuantities[event.target.name]--;
        
        setQuantities(newQuantities);
    
        console.log('data when added');
        console.log(data);
        
        console.log('Success:', data);
        } catch (error) {
             console.error('Error:', error);
         }
      }

    return (
        <>
            <h3 className={classes.heading}>Cart</h3>
            {cartData && isLoggedIn && <div className={classes.container}>
                {filteredData.map((product, index) => <div className={classes.wrapper}>
                    <div className={classes['img-container']}>
                        <img className={classes.image} src={product.image} alt='shoe'/>
                    </div>
                    <div className={classes['details-container']}>
                        <h2 className={classes.brand}>{product.brand}</h2>
                        <span className={classes.model}>{product.model}</span>
                        <span className={classes.size}>Size: {product.size}</span>
                        <span className={classes.price}>{product.price} &euro;</span>
                    </div>
                    <div className={classes['buttons-container']}>
                        <div className={classes['change-quantity-container']}>
                            <button className={`${classes['decrease-quantity']} ${quantities[index] <= 1 && classes['decrease-quantity-disabled']}`} title='Remove' id={`${product.model}${product.size}`} name={index} onClick={updateQuantity} disabled={quantities[index] <= 1}>&#8722;</button>
                            <span className={classes.quantity}>{quantities[index]}</span>
                            <button className={classes['increase-quantity']} title='Add' id={`${product.model}${product.size}`} name={index} onClick={updateQuantity}>&#43;</button>
                        </div>
                        <button className={classes['remove-button']} id={`${product.model}${product.size}`} onClick={removeFromCart}>&times;</button>
                    </div>
                </div>)}
                <div className={classes.total}>
                    <h3>Total: </h3> 
                    {filteredData.reduce((acc, cur, index) => {return acc + cur.price * quantities[index]}, 0)} &euro;
                </div>
                {!DBisEmpty && !toCheckout && <button className={classes['order-button']} onClick={() => setToCheckout(true)}>To Checkout</button>}
                {toCheckout && <Checkout closeCheckout={() => setToCheckout(false)} />}
            </div>}
            {isLoading && <div className={classes['loading-wrapper']}><div className={classes["lds-facebook"]}><div></div><div></div><div></div></div></div>}
            {DBisEmpty && <div className={classes.container}><span className={classes['empty-list']}>Your cart is empty.</span></div>}
            {!isLoggedIn && <div className={classes.container}><span className={classes['empty-list']}>You must be logged in to see your cart items.</span></div>}
        </>
    );
}

export default Cart;