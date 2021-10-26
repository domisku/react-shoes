import classes from './Checkout.module.scss';
import { useState } from 'react';

function Checkout(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [adress, setAdress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');

    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [adressError, setAdressError] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [countryError, setCountryError] = useState('');



    function formSubmitHandler(event) {
        event.preventDefault();

        if (validateInputs()) {
            const order = {name, surname, adress, postalCode, phoneNumber, country};
            console.log(order);

            setName('');
            setSurname('');
            setAdress('');
            setPostalCode('');
            setPhoneNumber('');
            setCountry('');
        }
    }

    function validateInputs() {
        let inputsAreValid = true;

        if (!name) {
            setNameError(true);
            inputsAreValid = false;
        } else setNameError(false);
        if (!surname) {
            setSurnameError(true);
            inputsAreValid = false;
        } else setSurnameError(false);
        if (!adress) {
            setAdressError(true);
            inputsAreValid = false;
        } else setAdressError(false);
        if (!postalCode) {
            setPostalCodeError(true);
            inputsAreValid = false;
        } else setPostalCodeError(false);
        if (!phoneNumber) {
            setPhoneNumberError(true);
            inputsAreValid = false;
        } else setPhoneNumberError(false);
        if (!country) {
            setCountryError(true);
            inputsAreValid = false;
        } else setCountryError(false);

        return inputsAreValid;
    }

    function inputHandler(event) {
        switch(event.target.id) {
            case 'name':
                setName(event.target.value);
                break;
            case 'surname':
                setSurname(event.target.value);
                break;
            case 'adress':
                setAdress(event.target.value);
                break;
            case 'postal-code':
                setPostalCode(event.target.value);
                break;
            case 'phone-number':
                setPhoneNumber(event.target.value);
                break;
            case 'country':
                setCountry(event.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <h2>Checkout</h2>
                <label htmlFor='name'>First Name</label>
                <input className={nameError ? classes.invalid : ''} type='text' id='name' value={name} onChange={inputHandler}></input>
                {nameError && <span className={classes.error}>Don't leave this field empty</span>}
                <label htmlFor='surname'>Last Name</label>
                <input className={surnameError ? classes.invalid : ''} type='text' id='surname' value={surname} onChange={inputHandler}></input>
                {surnameError && <span className={classes.error}>Don't leave this field empty</span>}
                <label htmlFor='adress'>Adress</label>
                <input className={adressError ? classes.invalid : ''} type='text' id='adress' value={adress} onChange={inputHandler}></input>
                {adressError && <span className={classes.error}>Don't leave this field empty</span>}
                <label htmlFor='postal-code'>Postal Code</label>
                <input className={postalCodeError ? classes.invalid : ''} type='text' id='postal-code' value={postalCode} onChange={inputHandler}></input>
                {postalCodeError && <span className={classes.error}>Don't leave this field empty</span>}
                <label htmlFor='phone-number'>Phone Number</label>
                <input className={phoneNumberError ? classes.invalid : ''} type='text' id='phone-number' value={phoneNumber} onChange={inputHandler}></input>
                {phoneNumberError && <span className={classes.error}>Don't leave this field empty</span>}
                <label htmlFor='country'>Country</label>
                <input className={countryError ? classes.invalid : ''} type='text' id='country' value={country} onChange={inputHandler}></input>
                {countryError && <span className={classes.error}>Don't leave this field empty</span>}
                <div className={classes['button-container']}>
                    <button className={classes.order} type='submit'>Order</button>
                    <button className={classes.cancel} onClick={props.closeCheckout}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Checkout;