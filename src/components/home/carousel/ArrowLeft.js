import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./ArrowStyles.module.scss";

function ArrowLeft(props) {
  function clickHandler() {
    props.goToPrevSlide();
  }

  return (
    <div onClick={clickHandler}>
      <FontAwesomeIcon icon={faChevronLeft} className={classes.icon} />
    </div>
  );
}

export default ArrowLeft;
