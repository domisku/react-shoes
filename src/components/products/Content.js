import { useState } from 'react';
import { useSelector } from 'react-redux';
import { filterActions } from '../../store';
import classes from "./Content.module.scss";
import Card from "./Card";
import productData from "./productData";
// import FilteredData from "./FilteredData";
// import fullProductData from "./fullProductData";

function Content() {
    const filters = useSelector((state) => state.data);

    console.log(filters);
    let data;

    if (filters === undefined) data = productData;
    else data = productData.filter((product, index) => filters.brands.includes(product.brand) && 
    filters.colors.includes(product.color) && filters.genders.includes(product.gender) &&
    filters.types.includes(product.type) && product.size.some((size) => filters.sizes.includes(size)) &&
    filters.prices[0] <= product.price && filters.prices[1] >= product.price)
   
  return (
    <div className={classes.container}>
      <h1>All Products</h1>
      <div>Sort</div>
      <div className={classes["main-content"]}>
        {data.map((data, index) => {
          return (
            <Card
              brand={data.brand}
              model={data.model}
              price={data.price}
              special={data.special}
              image={data.image}
              key={`c${index}`}
            ></Card>
          );
        })}
      </div>
      {/* <FilteredData filter={receiveFilteredData} /> */}
    </div>
  );
}

export default Content;
