import classes from './Login.module.scss';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnxvW60oxEUOdVTAER-T14lcNiJq6ybVE';

function Login() {
    const dispatch = useDispatch();

    const passwordInputRef = useRef();
    const emailInputRef = useRef();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const token = useSelector((state) => state.auth.idToken);

    function getDB() {
        console.log(token)
        get();
    }
    

    async function post() {
        try {
        const response = await fetch('https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/petras/liked.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({model: 'V908'})
        });
        const data = await response.json();
        
        console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    

    async function get() {
        try {
        const response = await fetch(`https://react-shoes-default-rtdb.europe-west1.firebasedatabase.app/users/petras/liked.json?auth=${token.idToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        
        console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    function formSubmitHandler(event) {
        event.preventDefault();

        const userData = { email, password, returnSecureToken: true };

        getIdToken(userData);

        setPassword('');
        setEmail('');
    }

    async function getIdToken(credentials) {
        try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();

        dispatch(authActions.storeIdToken({ idToken: data.idToken }));
        
        console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function passwordChangeHandler(event) {
        setPassword(event.target.value);
    }

    function emailChangeHandler(event) {
        setEmail(event.target.value);
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler} className={classes.form}>
                <h2 onClick={getDB}>Login</h2>
                <label htmlFor='email'>Email</label>
                <input value={email} type='email' id='email' onChange={emailChangeHandler} ref={emailInputRef}></input>
                <label htmlFor='password'>Password</label>
                <input value={password} type='password' id='password' onChange={passwordChangeHandler} ref={passwordInputRef}></input>
                <button type='submit'>Log In</button>
            </form>
        </div>
    );
}

export default Login;