import classes from "./Register.module.scss";
import { useState, useRef } from "react";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnxvW60oxEUOdVTAER-T14lcNiJq6ybVE";

function Register(props) {
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  function formSubmitHandler(event) {
    event.preventDefault();

    validateInput(password, "password");
    validateInput(email, "email");

    const userData = { email, password, returnSecureToken: true };

    if (emailIsValid & passwordIsValid) saveToDatabase(userData);

    setPassword("");
    setEmail("");
  }

  async function saveToDatabase(credentials) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) setAlert(true);
      else setError(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
    if (!passwordIsValid)
      validateInput(passwordInputRef.current.value, "password");
  }

  function emailChangeHandler(event) {
    setEmail(event.target.value);
    if (!emailIsValid) validateInput(emailInputRef.current.value, "email");
  }

  function isValid(event) {
    validateInput(event.target.value, event.target.id);
  }

  function validateInput(value, type) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch (type) {
      case "password":
        if (passwordRegex.test(value)) setPasswordIsValid(true);
        else setPasswordIsValid(false);
        break;
      case "email":
        if (emailRegex.test(value)) setEmailIsValid(true);
        else setEmailIsValid(false);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {!alert && (
        <form onSubmit={formSubmitHandler} className={classes.form} noValidate>
          <h2>Register</h2>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={isValid}
            className={!emailIsValid ? classes["invalid-email"] : ""}
            ref={emailInputRef}
          ></input>
          {!emailIsValid && (
            <span className={classes.error}>Please enter a valid email</span>
          )}
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={isValid}
            className={!passwordIsValid ? classes["invalid-password"] : ""}
            ref={passwordInputRef}
          ></input>
          {!passwordIsValid && (
            <span className={classes.error}>
              Password must include at least 1 number and a lowercase and an
              uppercase letter
            </span>
          )}
          {error && (
            <span className={classes.error}>This email is already in use</span>
          )}
          <button type="submit">Register</button>
          <span className={classes["log-in"]} onClick={props.switchUserPage}>
            Log in with an existing account
          </span>
        </form>
      )}
      {alert && (
        <div className={classes["alert-container"]}>
          <span className={classes.alert}>
            <span>Registered!</span>
            <span>
              You may{" "}
              <b
                className={classes["login-link"]}
                onClick={props.switchUserPage}
              >
                login
              </b>{" "}
              now!
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default Register;
