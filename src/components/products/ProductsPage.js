import Sidebar from "./Sidebar";
import Content from "./Content";
import classes from './ProductsPage.module.scss';
import { useState } from "react";

function ProductsPage() {
    const [sidebarActive, setSidebarActive] = useState(false);

    function toggleSidebar() {
        setSidebarActive(!sidebarActive);
    }

    return (
        <div className={classes.container}>
            <Sidebar toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />
            <Content sidebarActive={sidebarActive} />
        </div>
    );
}

export default ProductsPage;