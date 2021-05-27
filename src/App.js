import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingBox from './components/LoadingBox';
import { listProductCategories } from './actions/productActions';
import MessageBox from './components/MessageBox';
// import PrivateRoute from './components/PrivateRoute';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
          <Link className="brand" to="/">
              foodlocker
            </Link>
          </div>
          <div>
        <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/location">Delivery Locations</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
        </div>
        </header>


        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.categories.map((c) => (
                <li key={c.id}>
                  {/* <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  > */}
                    {c.name}
                  {/* </Link> */}
                </li>
              ))
            )}
          </ul>
        </aside>
        
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          {/* <Route path="/location" component={ShippingAddressScreen}></Route> */}

          

          {/* <PrivateRoute
            path="/location"
            component={ProfileScreen}
          ></PrivateRoute> */}

          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer className="row center">
        <div>All right reserved</div>{' '}
        </footer>
        

        </div>
       
        </BrowserRouter>
   
  );
}

export default App;
