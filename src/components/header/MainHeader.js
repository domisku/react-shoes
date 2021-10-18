import Categories from "./header-items/Catagories";
import CustomerActions from "./header-items/CustomerActions";
import SearchBar from "./header-items/SearchBar";
import classes from "./MainHeader.module.scss";
import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Categories />
        <h1 className={classes.title}>
          <Link to='/'>Shoeworld</Link>
        </h1>
        <SearchBar />
        <CustomerActions />
      </div>
    </div>
  );
}

export default MainHeader;
