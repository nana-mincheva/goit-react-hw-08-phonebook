import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import authSelectors from 'redux/auth/authSelectors';

import css from './Navigation.module.css';

export const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <ul className={css.itemList}>
      <li className={css.item}>
        <NavLink className={css.link} to={'/'}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Home
        </NavLink>
      </li>
      {isLoggedIn ? (
        <li className={css.item}>
          <NavLink className={css.link} to={'contacts'}>
            Contacts
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </NavLink>
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};
