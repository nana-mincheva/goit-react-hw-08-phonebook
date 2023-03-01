import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as authOperation from '../../redux/auth/authOperation';

import css from './RegisterForm.module.css';

export function RegisterForm () {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return('Invalid subscription type');
    }
  };

  const formSubmit = e => {
    e.preventDefault();
    dispatch(authOperation.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <main className={css.container}>
      <div className={css.loginBox}>
        <h1 className={css.text}>Register</h1>
        <form onSubmit={formSubmit}>
          <div className={css.userBox}>
            <input
              autoComplete="off"
              type="text"
              name="name"
              required
              onChange={handleCange}
            />
            <label>Name</label>
          </div>

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
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
};