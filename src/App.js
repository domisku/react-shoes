import { Route, Switch } from "react-router-dom";
import "./App.scss";

import TopHeader from "./components/header/TopHeader";
import MainHeader from "./components/header/MainHeader";
import Newsletter from "./components/footer/Newsletter";
import Copyright from "./components/footer/Copyright";
import Popup from "./components/popup/Popup";
import Carousel from "./components/home/carousel/Carousel";
import AboutUs from "./components/home/AboutUs";
import PopularCategories from "./components/home/PopularCategories";
import ProductsPage from "./components/products/ProductsPage";
import ProductDetails from "./components/products/detailsPage/ProductDetails";
import logoutTimer from "./utils/logoutTimer";

function App() {
  logoutTimer();

  return (
    <>
      <header>
        <TopHeader></TopHeader>
        <MainHeader></MainHeader>
      </header>
      <main className="main-content">
        <Switch>
          <Route path="/" exact>
            <Carousel />
            <PopularCategories />
            <AboutUs />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/product-details/:productId">
            <ProductDetails />
          </Route>
        </Switch>
      </main>
      <footer>
        <Popup />
        <Newsletter></Newsletter>
        <Copyright></Copyright>
      </footer>
    </>
  );
}

export default App;
