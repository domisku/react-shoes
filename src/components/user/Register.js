import classes from './Register.module.scss';

function Register() {
    function formSubmitHandler(event) {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username'></input>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password'></input>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email'></input>
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;