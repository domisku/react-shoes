import Categories from "./header-items/Catagories";
import CustomerActions from "./header-items/CustomerActions";
import classes from "./MainHeader.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBars, faShoePrints } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function MainHeader() {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Categories />
        <h1 className={classes.title}>
          <Link to="/">
            FOOTPRINT
            <Icon icon={faShoePrints}></Icon>
          </Link>
        </h1>
        <CustomerActions />
      </div>
      <div className={classes["dropdown-header"]}>
        <div className={classes["dropdown-container"]}>
          <button
            className={classes.button}
            onClick={() => setDropdownActive(!dropdownActive)}
          >
            <Icon icon={faBars}></Icon>
          </button>
          <h1 className={classes.title2}>
            <Link to="/">
              FOOTPRINT
              <Icon className={classes.icon} icon={faShoePrints}></Icon>
            </Link>
          </h1>
          <CustomerActions />
        </div>
        {dropdownActive && (
          <div
            className={classes["dropdown-items"]}
            onClick={() => setDropdownActive(false)}
          >
            <span>
              <Link to="/products?gender=Women">Women</Link>
            </span>
            <span>
              <Link to="/products?gender=Men">Men</Link>
            </span>
            <span>
              <Link to="/products?gender=Kids">Kids</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainHeader;
