import classes from "./PopularCategories.module.scss";

function PopularCategories() {
  return (
    <>
      <h3 className={classes['category-heading']}>Popular Categories</h3>
      <div className={classes.container}>
        <button>Sneakers</button>
        <button>Crocs</button>
        <button>High Heels</button>
        <button>Knee Boots</button>
        <button>Oxford Shoes</button>
        <button>Galoshes</button>
        <button>Moccasins</button>
        <button>Sandals</button>
      </div>
    </>
  );
}

export default PopularCategories;
