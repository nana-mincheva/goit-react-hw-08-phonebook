import { lazy,Suspense,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AppBar } from 'components/AppBar/AppBar';
import { fetchCurrentUser } from 'redux/auth/authOperation';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

const Home = lazy(() => import ('pages/Home/Home'));
const Contacs = lazy(() => import ('pages/Contacs/Contacs'));
const Register = lazy(() => import ( 'pages/Register/Register'));
const Login = lazy(() => import('pages/Login/Login'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  
  return  (
     <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<AppBar />}>
          <Route index element={<Home />} />
          <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={Register}  />
          }
          />
           <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/contacts" component={Login} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login" component={Contacs} />}
        />        
      </Route>
        <Route path="*" element={<Home />} />
    </Routes>
    </Suspense>
  );
}
