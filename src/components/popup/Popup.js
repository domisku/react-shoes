import ReactDOM from 'react-dom';
import classes from './Popup.module.scss';

function Popup(props) {
    function closePopupHandler() {
        props.onClose();
    }

    return ReactDOM.createPortal(
        <div className={classes.container}>
            <button className={classes.button} onClick={closePopupHandler}>&times;</button>
            <p><b>Alert!</b> This website is part of a project portfolio
                 and is not used for real ecommerce purposes. 
                 All products shown are only presentational.</p>
            <button className={classes.button2} onClick={closePopupHandler}>Got it!</button>
        </div>, 
        document.getElementById('popup-root'))
}

export default Popup;