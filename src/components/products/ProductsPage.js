import Sidebar from "./Sidebar";
import Content from "./Content";
import classes from './ProductsPage.module.scss';

function ProductsPage() {
    return (
        <div className={classes.container}>
            <Sidebar />
            <Content />
        </div>
    );
}

export default ProductsPage;