import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => {
  return (
    <ul className={css.itemList}>
      <li className={css.item}>
        <NavLink className={css.link} to={'/login'}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Log in
        </NavLink>
      </li>
      <li className={css.item}>
        <NavLink className={css.link} to={'/register'}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign up
        </NavLink>
      </li>
    </ul>
  );
};
