import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductCard from './components/ProductCard';
import ProductScreen from './Screens/ProductScreen';
import AllProducts from './Screens/AllProducts';
import AccountSettings from './Screens/AccountSettings';
import Login from './Screens/Login';
import Register from './Screens/Register';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './Screens/CartScreen';
import CheckoutScreen from './Screens/CheckoutScreen';

const router = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<App />}>
  <Route path='/' index element={<HomeScreen/>} />
  <Route path='/productCard' index element={<ProductCard />} />
  <Route path='/product/:id' element={<ProductScreen />} />
  <Route path='/allproducts' element={<AllProducts />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route path='/cart' element={<CartScreen />} />

  <Route path='' element={<PrivateRoute />}>
    <Route path='/myaccount' element={<AccountSettings />} />
    <Route path='/checkout' element={<CheckoutScreen />} />
  </Route>

</Route>))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
