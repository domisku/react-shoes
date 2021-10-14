import classes from "./Content.module.scss";
import Card from "./Card";
import productData from "./productData";

function Content() {
  return (
    <div className={classes.container}>
      <h1>All Products</h1>
      <div>Sort</div>
      <div className={classes["main-content"]}>
        {productData.map((data) => {
          return (
            <Card
              brand={data.brand}
              model={data.model}
              price={data.price}
              special={data.special}
              image={data.image}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default Content;
