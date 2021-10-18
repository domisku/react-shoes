import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classes from './Brands.module.scss';
// import fullProductData from '../fullProductData';
import productData from '../productData';
// import FilteredData from '../FilteredData';
import { filterActions } from '../../../store';

function Brands() {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    function clickHandler(event) {
        if (isActive === false) setIsActive(true);
        else setIsActive(false);
    }

    function Checkbox() {
        const [activeBrands, setActiveBrands] = useState([]);
        // const [isChecked, setIsChecked] = useState({});

        const brandsData = [];

        for (let product of productData) {
            brandsData.push(product.brand);
        }

        const brands = [...new Set(brandsData.sort())];

        function onChange(event) {
            if (event.target.checked) {
                // setIsChecked((previous) => ({...previous, [event.target.id]: true}));
                setActiveBrands((previous => [...previous, event.target.name]));
            } else {
                setActiveBrands((previous) => previous.filter(brand => brand !== event.target.name))
            }
        }

        const noFilter = useRef(brands);
        useEffect(() => {
            if (!activeBrands[0]) dispatch(filterActions.updateBrand({brands: noFilter.current}));
            else dispatch(filterActions.updateBrand({brands: activeBrands}));
        }, [activeBrands]);

        return (
            <>
                {brands.map((brand, index) => <div className={classes.container}>
                    <label htmlFor={`brand${index}`}>
                        {brand}
                        <input name={brand} type='checkbox' id={`brand${index}`} onChange={onChange}></input>
                        <span className={classes.checkmark}></span>
                    </label>
                </div>)}
            </>
            )
    }

  return (
    <>
      <span>Brands</span>
      <button onClick={clickHandler}>
        <FontAwesomeIcon icon={faAngleDown} className={classes.icon} />
      </button>
      <div className={`${classes.dropdown} ${isActive && classes.active}`}><Checkbox /></div>
    </>
  );
}


export default Brands;