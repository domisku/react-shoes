import classes from "./Modal.module.scss";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

function Backdrop(props) {
  const dispatch = useDispatch();

  function backdropClickHandler() {
    props.togglePage();
    dispatch(authActions.modalClosed());
  }

  return (
    <div className={classes.backdrop} onClick={backdropClickHandler}></div>
  );
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      <button className={classes.button} onClick={props.togglePage}>
        &times;
      </button>
    </div>
  );
}

const portalElement = document.getElementById("overlays");

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          togglePage={
            props.toggleUserPage ||
            props.toggleFavouritesPage ||
            props.toggleCartPage
          }
        />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          togglePage={
            props.toggleUserPage ||
            props.toggleFavouritesPage ||
            props.toggleCartPage
          }
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
