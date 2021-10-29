import classes from "./Login.module.scss";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnxvW60oxEUOdVTAER-T14lcNiJq6ybVE";

function Login(props) {
  const dispatch = useDispatch();

  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);

  function formSubmitHandler(event) {
    event.preventDefault();

    const userData = { email, password, returnSecureToken: true };

    getIdToken(userData);

    setPassword("");
    setEmail("");
  }

  async function getIdToken(credentials) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        const expirationTime = new Date(
          new Date().getTime() + data.expiresIn * 1000
        ).getTime();

        dispatch(authActions.storeIdToken({ idToken: data.idToken }));
        dispatch(
          authActions.storeUsername({ username: makeUsername(data.email) })
        );
        dispatch(authActions.storeTokenExpirationTime({ expirationTime }));

        if (error) setError(false);
        setAlert(true);

        setTimeout(() => {
          props.toggleUserPage();
          dispatch(authActions.modalClosed());
        }, 1500);
      } else setError(true);

      function makeUsername(email) {
        return email.replace(/[^\w\d]/g, "R");
      }
    } catch (error) {
      console.error("Error:", error);
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
      {!alert && (
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="text"
            id="email"
            onChange={emailChangeHandler}
            ref={emailInputRef}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            ref={passwordInputRef}
          ></input>
          {error && (
            <span className={classes.error}>Invalid username or password</span>
          )}
          <button type="submit">Log In</button>
          <span
            className={classes["new-account"]}
            onClick={props.switchUserPage}
          >
            Create new account
          </span>
        </form>
      )}
      {alert && (
        <div className={classes["alert-container"]}>
          <span className={classes.alert}>
            <span>
              <Icon icon={faCheck} className={classes.icon}></Icon>
              Login successful!
            </span>
            <span className={classes.welcome}>Welcome!</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default Login;
