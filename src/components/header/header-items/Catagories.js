import classes from './Categories.module.scss';
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className={classes.container}>
      <span>
        <Link to='/products'>Women</Link>
      </span>
      <span>Men</span>
      <span>Kids</span>
      <span>Sale</span>
    </div>
  );
}

export default Categories;
