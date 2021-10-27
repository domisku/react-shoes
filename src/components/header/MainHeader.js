import Categories from "./header-items/Catagories";
import CustomerActions from "./header-items/CustomerActions";
import classes from "./MainHeader.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons";

function MainHeader() {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Categories />
        <h1 className={classes.title}>
          <Link to='/'>
            FOOTPRINT
            <Icon icon={faShoePrints}></Icon>
          </Link>
        </h1>
        <CustomerActions />
      </div>
    </div>
  );
}

export default MainHeader;
