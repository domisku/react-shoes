import classes from "./Categories.module.scss";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className={classes.container}>
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
  );
}

export default Categories;
