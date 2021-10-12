import classes from './TopHeader.module.scss';

function TopHeader() {
    return (
        <div className={classes.container}>
            <span>Help and Contacts</span>
            <span>Free Shipping</span>
            <span>30 Day Return Policy</span>
        </div>
    );
}

export default TopHeader;

