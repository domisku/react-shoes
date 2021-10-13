import classes from './Categories.module.scss';

function Categories() {
  return (
    <div className={classes.container}>
      <span>Women</span>
      <span>Men</span>
      <span>Kids</span>
      <span>Sale</span>
    </div>
  );
}

export default Categories;