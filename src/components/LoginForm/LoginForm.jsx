import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as authOperation from 'redux/auth/authOperation';

import css from './LoginForm.module.css';

export function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCange = ({ target: { name, value } }) => {
    switch (name) {
        case 'email':
            setEmail(value);
            break;
        case 'password':
            setPassword(value);
            break;
        default:
           return;
    }
  };

  const formSubmit = e => {
    e.preventDefault();
    dispatch(authOperation.logIn({ email, password }));
    e.currentTarget.reset();
    };
    
  return (
    <main className={css.container}>
      <div className={css.loginBox}>
        <h1 className={css.text}>Log In</h1>
        <form onSubmit={formSubmit}>
          <div className={css.userBox}>
            <input
              autoComplete="off"
              type="email"
              name="email"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleCange}
            />
            <label>Mail</label>
          </div>
          <div className={css.userBox}>
            <input
              autoComplete="off"
              type="password"
              name="password"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleCange}
            />
            <label>Password</label>
          </div>

          <button className={css.button} type="submit">
            <span className={css.top}></span>
            <span className={css.right}></span>
            <span className={css.bottom}></span>
            <span className={css.left}></span>
            Log in
          </button>
        </form>
      </div>
    </main>
  );
};