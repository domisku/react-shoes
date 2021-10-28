import { useSelector } from 'react-redux';
import classes from "./Content.module.scss";
import Card from "./Card";
import productData from "./productData";
import Select from 'react-select';
import { useState} from 'react';
// import FilteredData from "./FilteredData";
// import fullProductData from "./fullProductData";

const options = [
  {value: 'default', label: 'Default Sorting'},
  {value: 'priceAsc', label: 'Price Ascending'},
  {value: 'priceDesc', label: 'Price Descending'},
  {value: 'brandAsc', label: 'Brand Ascending'},
  {value: 'brandDesc', label: 'Brand Descending'},
];

function Content(props) {
    const [sortBy, setSortBy] = useState('default');
    const filters = useSelector((state) => state.filter.data);

    let data;

    if (filters === null) data = productData;
    else data = productData.filter((product, index) => filters.brands.includes(product.brand) && 
    filters.seasons.includes(product.season) && filters.colors.includes(product.color) && 
    filters.genders.includes(product.gender) && filters.types.includes(product.type) && 
    product.size.some((size) => filters.sizes.includes(size)) &&
    filters.prices[0] <= product.price && filters.prices[1] >= product.price);

    function sortHandler(event) {
      if (event.value === 'priceAsc') setSortBy('priceAsc');
      else if (event.value === 'priceDesc') setSortBy('priceDesc');
      else if (event.value === 'brandDesc') setSortBy('brandDesc');
      else if (event.value === 'brandAsc') setSortBy('brandAsc');
      else if (event.value === 'default') setSortBy('default');
    }

    function sortedData(sortParam) {
      if (sortParam === 'priceAsc') return data.sort((a, b) => a.price - b.price);
      else if (sortParam === 'priceDesc') return data.sort((a, b) => b.price - a.price);
      else if (sortParam === 'brandDesc') return data.sort((a, b) => a.brand.localeCompare(b.brand));
      else if (sortParam === 'brandAsc') return data.sort((a, b) => b.brand.localeCompare(a.brand));
      else return data;
    }
   
  return (
    <>
    {!props.sidebarActive && <div className={classes.container}>
      <div className={classes['content-header']}>
        <h1 className={classes.heading}>Found Products</h1>
        <div className={classes['select-container']}>
          <Select
              className={classes.select}
              onChange={sortHandler}
              placeholder="Default Sorting"
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "#EFEFEF",
                  primary: "black",
                  neutral20: 'black',
                  neutral50: 'black',
                  neutral80: 'black',
                  neutral10: 'black',
                  neutral5: 'black',
                  neutral30: 'black',
                  neutral60: 'black',
                  neutral90: 'black',
                  neutral40: 'black',
                  neutral70: 'black'
                },
              })}
            />
        </div>
      </div>
      <div className={classes["main-content"]}>
        {sortedData(sortBy).map((data, index) => {
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
    </div>}
    </>
  );
}

export default Content;
