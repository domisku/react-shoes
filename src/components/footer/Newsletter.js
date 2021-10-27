import classes from './Newsletter.module.scss';
import { useEffect, useState } from 'react';

function Newsletter() {
    const [error, setError] = useState(false);
    const [wasSent, setWasSent] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        setError(false);
        setTimeout(() => {setWasSent(false)}, 6000);
    }, [wasSent]);


    function formSubmitHandler(event) {
        event.preventDefault();
        if (emailIsValid()) {
            setEmail('');
            setWasSent(true);
        } else setError(true);
    }

    function emailIsValid() {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    return (
        <div className={classes.container}>
            <div>Get information about new products and bargains</div>
            <div className={classes['subscribe-text']}>Subscribe to our newsletter!</div>
            {error && <span className={classes.error}>Please enter a valid email</span>}
            {wasSent && <span className={classes.success}>You've subscribed successfully</span>}
            <form onSubmit={formSubmitHandler} >
                <input value={email} className={classes.email} type='text' id='email' placeholder='Enter your email adress' onInput={(event) => setEmail(event.target.value)}></input>
                <button className={classes.button}>Send!</button>
            </form>
        </div>
    );
}

export default Newsletter;