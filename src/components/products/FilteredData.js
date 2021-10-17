import fullProductData from "./fullProductData";


function FilteredData(props) {

    console.log(props);

    const filteredProductData = fullProductData.filter((product) => props.brands.includes(product.brand));
    
    // props.filter(filteredProductData);
    
    return null;
}

export default FilteredData;