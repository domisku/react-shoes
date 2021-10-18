import slidesData from "./slidesData";
import classes from "./Slide.module.scss";

function Slide(props) {
  return (
    <section>
      {slidesData.map((data, index) => (
        <div
          className={
            classes[index === props.activeIndex ? "active" : "inactive"]
          }
          key={index}
        >
          <img className={classes.image} src={data.image} alt="shoe" />
          <h2 className={classes.description}>{data.description}</h2>
        </div>
      ))}
      <div className={classes.slideDots}>
        {slidesData.map((_, index) => (
          <div
            key={index}
            className={`${classes.slideDot} ${classes[index === props.activeIndex ? "active" : ""]}`}
            onClick={() => props.changeIndex(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default Slide;
