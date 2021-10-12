import Categories from "./header-items/Catagories";
import CustomerActions from "./header-items/CustomerActions";
import SearchBar from "./header-items/SearchBar";
import classes from "./MainHeader.module.scss";

function MainHeader() {
  return (
    <div className={classes.container}>
      <Categories />
      <h1 className={classes.title}>ReactShoes</h1>
      <SearchBar />
      <CustomerActions />
    </div>
  );
}

export default MainHeader;
