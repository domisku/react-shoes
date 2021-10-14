import classes from "./Sidebar.module.scss";
import Price from "./filters/Price";
import Brands from "./filters/Brands";
import Size from "./filters/Size";
import Color from "./filters/Color";
import Gender from "./filters/Gender";
import Type from "./filters/Type";
import Season from "./filters/Season";

function Sidebar() {

  return (
    <div className={classes.container}>
      <h3>Categories</h3>
      <ul className={classes.list}>
        <li>Sneakers</li>
        <li>Moccasins</li>
        <li>Sandals</li>
        <li>Knee Boots</li>
        <li>Galoshes</li>
      </ul>
      <h3>Filters</h3>
      <ul className={classes["filter-list"]}>
        <li>
            <Price></Price>
        </li>
        <li>
            <Brands></Brands>
        </li>
        <li>
            <Size></Size>
        </li>
        <li>
            <Color></Color>
        </li>
        <li>
            <Gender></Gender>
        </li>
        <li>
            <Type></Type>
        </li>
        <li>
            <Season></Season>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
