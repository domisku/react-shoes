import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./CustomerActions.module.scss";
import Modal from "../../UI/Modal";
import { useState } from "react";
import Login from "../../user/Login";
import Register from "../../user/Register";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store";
import Favourites from "../../favourites/Favourites";
import Cart from "../../cart/Cart";

function CustomerActions() {
  const [userPageIsShown, setUserPageIsShown] = useState(false);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [favouritesPageIsShown, setFavouritesPageIsShown] = useState(false);

  const [cartPageIsShown, setCartPageIsShown] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = !!useSelector((state) => state.auth.idToken);

  function toggleUserPage() {
    if (!userPageIsShown && !isLoggedIn) setUserPageIsShown(true);
    else setUserPageIsShown(false);
  }

  function switchUserPage() {
    if (!needsRegistration) setNeedsRegistration(true);
    else setNeedsRegistration(false);
  }

  function toggleUserDropdown() {
    if (!showUserDropdown) setShowUserDropdown(true);
    else setShowUserDropdown(false);
  }

  function logoutHandler() {
    dispatch(authActions.logout());
  }

  function toggleFavouritesPage() {
    if (!favouritesPageIsShown) setFavouritesPageIsShown(true);
    else setFavouritesPageIsShown(false);
  }

  function toggleCartPage() {
    if (!cartPageIsShown) setCartPageIsShown(true);
    else setCartPageIsShown(false);
  }

  return (
    <div className={classes.container}>
      <span
        onClick={toggleUserPage}
        onMouseEnter={toggleUserDropdown}
        onMouseLeave={toggleUserDropdown}
      >
        <FontAwesomeIcon icon={faUser} className={classes.icon} />
        {showUserDropdown && (
          <div className={classes["user-dropdown"]}>
            {isLoggedIn && <button onClick={logoutHandler} className={classes.button}>Log Out</button>}
            {!isLoggedIn && <button onClick={toggleUserPage} className={classes.button}>Log In</button>}
          </div>
        )}
      </span>
      <span onClick={toggleFavouritesPage}>
        <FontAwesomeIcon icon={faHeart} className={classes.icon} />
      </span>
      <span onClick={toggleCartPage}>
        <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
      </span>
      {userPageIsShown && (
        <Modal toggleUserPage={toggleUserPage}>
          {!needsRegistration ? (
            <Login switchUserPage={switchUserPage} />
          ) : (
            <Register switchUserPage={switchUserPage} />
          )}
        </Modal>
      )}
      {favouritesPageIsShown && (
        <Modal toggleFavouritesPage={toggleFavouritesPage}><Favourites /></Modal>
      )}
      {cartPageIsShown && (
        <Modal toggleCartPage={toggleCartPage}><Cart /></Modal>
      )}
    </div>
  );
}

export default CustomerActions;
