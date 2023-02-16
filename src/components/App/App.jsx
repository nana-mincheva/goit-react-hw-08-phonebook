import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Contacs from 'pages/Contacs/Contacs';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import Layout from 'components/Layout/Layout';
import { fetchCurrentUser } from 'redux/auth/authOperation';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/goit-react-hw-08-phonebook" element={<Home />} />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login" component={Contacs} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={Login} redirectTo="/contacts" />}
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute component={Register} redirectTo="/contacts" />
          }
        />
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
