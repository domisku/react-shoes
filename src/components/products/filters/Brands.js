import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Brands.module.scss';
import fullProductData from '../fullProductData';
import FilteredData from '../FilteredData';

function Brands() {
    const [isActive, setIsActive] = useState(false);

    function clickHandler() {
        if (isActive === false) setIsActive(true);
        else setIsActive(false);
    }

    function Checkbox() {
        const [activeBrands, setActiveBrands] = useState(['Greati']);

        const brandsData = [];

        for (let product of fullProductData) {
            brandsData.push(product.brand);
        }

        const brands = [...new Set(brandsData.sort())];

        function onChange(event) {
            if (event.target.checked) {
                setActiveBrands((previous => [...previous, event.target.name]));
            } else {
                setActiveBrands((previous) => previous.filter(brand => brand !== event.target.name))
            }
            console.log(activeBrands);
        }

        return (
            <>
                {brands.map((brand, index) => <div className={classes.container}>
                    <label htmlFor={`brand${index}`}>
                        {brand}
                        <input name={brand} type='checkbox' id={`brand${index}`} onChange={onChange}></input>
                        <span className={classes.checkmark}></span>
                    </label>
                </div>)}
                <FilteredData brands={activeBrands} />
            </>
            )
    }

  return (
    <>
      <span>Brands</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      {isActive && <div className={classes.dropdown}><Checkbox /></div>}
    </>
  );
}


export default Brands;