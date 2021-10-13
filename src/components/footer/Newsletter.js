import classes from './Newsletter.module.scss';

function Newsletter() {
    function formSubmitHandler(event) {
        event.preventDefault();
    }

    return (
        <div className={classes.container}>
            <div>Get information about new products and bargains</div>
            <div className={classes['subscribe-text']}>Subscribe to our newsletter!</div>
            <form onSubmit={formSubmitHandler} >
                <input className={classes.email} type='email' id='email' placeholder='Enter your email adress'></input>
                <button className={classes.button}>Send!</button>
            </form>
        </div>
    );
}

export default Newsletter;