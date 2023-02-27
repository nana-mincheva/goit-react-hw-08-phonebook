import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AuthNav } from 'components/AuthNav/AuthNav';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import authSelectors from 'redux/auth/authSelectors';

import css from './AppBar.module.css';

export const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
    <header className={css.container}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}     
    </header>      
    <Outlet />
      </>
  );
};
