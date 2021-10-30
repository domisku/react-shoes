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
import { useDispatch } from "react-redux";
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

  function getIdToken() {
    return localStorage.getItem("token");
  }

  function toggleUserPage() {
    if (!userPageIsShown && !getIdToken()) setUserPageIsShown(true);
    else setUserPageIsShown(false);
  }

  function switchUserPage() {
    setNeedsRegistration(!needsRegistration);
  }

  function toggleUserDropdown() {
    setShowUserDropdown(!showUserDropdown);
  }

  function logoutHandler() {
    dispatch(authActions.logout());
    console.log("logout handler activates");
  }

  function toggleFavouritesPage() {
    setFavouritesPageIsShown(!favouritesPageIsShown);
  }

  function toggleCartPage() {
    setCartPageIsShown(!cartPageIsShown);
  }

  return (
    <div className={classes.container}>
      <span className={classes['icon-span']}
        onClick={toggleUserPage}
        onMouseEnter={toggleUserDropdown}
        onMouseLeave={toggleUserDropdown}
      >
        <FontAwesomeIcon icon={faUser} className={classes.icon} />
        {showUserDropdown && (
          <div className={classes["user-dropdown"]}>
            {getIdToken() && (
              <button onClick={logoutHandler} className={classes.button}>
                Log Out
              </button>
            )}
            {!getIdToken() && (
              <button onClick={toggleUserPage} className={classes.button}>
                Log In
              </button>
            )}
          </div>
        )}
      </span>
      <span onClick={toggleFavouritesPage} className={classes['icon-span']}>
        <FontAwesomeIcon icon={faHeart} className={classes.icon} />
      </span>
      <span onClick={toggleCartPage} className={classes['icon-span']}>
        <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
      </span>
      {userPageIsShown && (
        <Modal toggleUserPage={toggleUserPage}>
          {!needsRegistration ? (
            <Login
              switchUserPage={switchUserPage}
              toggleUserPage={toggleUserPage}
            />
          ) : (
            <Register switchUserPage={switchUserPage} />
          )}
        </Modal>
      )}
      {favouritesPageIsShown && (
        <Modal toggleFavouritesPage={toggleFavouritesPage}>
          <Favourites toggleFavouritesPage={toggleFavouritesPage} />
        </Modal>
      )}
      {cartPageIsShown && (
        <Modal toggleCartPage={toggleCartPage}>
          <Cart />
        </Modal>
      )}
    </div>
  );
}

export default CustomerActions;
