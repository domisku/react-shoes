import Sidebar from "./Sidebar";
import Content from "./Content";
import classes from "./ProductsPage.module.scss";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function ProductsPage() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const showContent = useMediaQuery({ query: "(min-width: 576px)" });

  if (showContent && sidebarActive) {
    toggleSidebar();
  }

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
