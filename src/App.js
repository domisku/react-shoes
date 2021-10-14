import { useState } from 'react';
import './App.scss';

import TopHeader from './components/header/TopHeader';
import MainHeader from './components/header/MainHeader';
import Newsletter from './components/footer/Newsletter';
import Copyright from './components/footer/Copyright';
import Popup from './components/popup/Popup';
import Carousel from './components/carousel/Carousel';
import AboutUs from './components/main/AboutUs';
import PopularCategories from './components/main/PopularCategories';

function App() {
  const [popupIsShown, setPopupIsShown] = useState(true);

  function closePopupHandler() {
    setPopupIsShown(false);
  }

  return (
    <>
      <header>
        <TopHeader></TopHeader>
        <MainHeader></MainHeader>
      </header>
      <main className='main-content'>
        <Carousel />
        <PopularCategories />
        <AboutUs />
      </main>
      <footer>
        {popupIsShown && <Popup onClose={closePopupHandler} />}
        <Newsletter></Newsletter>
        <Copyright></Copyright>
      </footer>
    </>
  );
}

export default App;
