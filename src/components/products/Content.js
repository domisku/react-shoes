import { useState } from 'react';
import classes from "./Content.module.scss";
import Card from "./Card";
// import productData from "./productData";
// import FilteredData from "./FilteredData";
import fullProductData from "./fullProductData";

function Content() {
    // const [finalData, setFinalData] = useState([]);

    // function receiveFilteredData(filteredData) {
    //     setFinalData(filteredData);
    // }


  return (
    <div className={classes.container}>
      <h1>All Products</h1>
      <div>Sort</div>
      <div className={classes["main-content"]}>
        {fullProductData.map((data) => {
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
      {/* <FilteredData filter={receiveFilteredData} /> */}
    </div>
  );
}

export default Content;
