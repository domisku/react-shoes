import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classes from './ArrowStyles.module.scss';

function ArrowRight(props) {
    function clickHandler() {
        props.goToNextSlide();
    }

    return (
        <div onClick={clickHandler}>
            <FontAwesomeIcon icon={faChevronRight} className={classes.icon}/>
        </div>
    );
}

export default ArrowRight;