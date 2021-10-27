import classes from "./PopularCategories.module.scss";
import { Link } from "react-router-dom";

function PopularCategories() {
  return (
    <>
      <h3 className={classes['category-heading']}>Popular Categories</h3>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Link to='/products?brand=Martin'>Martin</Link>
          <Link to='/products?brand=Esser'>Esser</Link>
          <Link to='/products?brand=Legati'>Legati</Link>
          <Link to='/products?color=Black'>Black</Link>
          <Link to='/products?minPrice=0&maxPrice=40'>Cheap</Link>
          <Link to='/products?brand=Balance'>Balance</Link>
          <Link to='/products?type=Type+6'>Type 6</Link>
          <Link to='/products?season=All-Year'>All-Year</Link>
        </div>
      </div>
    </>
  );
}

export default PopularCategories;
