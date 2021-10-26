import { useSelector } from 'react-redux';
import classes from "./Content.module.scss";
import Card from "./Card";
import productData from "./productData";
import { useState, useEffect } from 'react';
// import FilteredData from "./FilteredData";
// import fullProductData from "./fullProductData";

function Content() {
    const filters = useSelector((state) => state.filter.data);

    let data;

    // console.log(`filters: ${filters}`)

    if (filters === null) data = productData;
    else data = productData.filter((product, index) => filters.brands.includes(product.brand) && 
    filters.seasons.includes(product.season) && filters.colors.includes(product.color) && 
    filters.genders.includes(product.gender) && filters.types.includes(product.type) && 
    product.size.some((size) => filters.sizes.includes(size)) &&
    filters.prices[0] <= product.price && filters.prices[1] >= product.price);
   
  return (
    <div className={classes.container}>
      <h1>Found Products</h1>
      <div>Sort</div>
      {console.log('return values rerendered')}
      {<div className={classes["main-content"]}>
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
      </div>}
    </div>
  );
}

export default Content;
