import ReactDOM from 'react-dom';
import classes from './Popup.module.scss';
import { useState } from 'react';

function Popup() {
    const [popupIsShown, setPopupIsShown] = useState(true);

    function closePopupHandler() {
        setPopupIsShown(false);
      }

    return ReactDOM.createPortal(
        <div className={`${classes.container} ${!popupIsShown && classes.disabled}`}>
            <button className={classes['close-popup']} onClick={closePopupHandler}>&times;</button>
            <p className={classes['popup-text']}><b>Alert!</b> This website is part of a project portfolio
                 and is not used for real ecommerce purposes. 
                 All products shown are purely presentational.</p>
            <button className={classes['close2-popup']} onClick={closePopupHandler}>Got it!</button>
        </div>, 
        document.getElementById('popup-root'))
}

export default Popup;