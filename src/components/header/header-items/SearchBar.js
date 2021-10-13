import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classes from './SearchBar.module.scss';


function SearchBar() {
  return (
    <div className={classes.container}>
      <label htmlFor="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.icon} />
      </label>
      <input type='text' id="search-bar" placeholder='search...' className={classes.input}></input>
    </div>
  );
}

export default SearchBar;
