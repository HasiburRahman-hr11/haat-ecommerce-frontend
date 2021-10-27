import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Shop from './pages/Shop/Shop';
import PageScroll from "./components/PageScroll/PageScroll";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Error from "./pages/Error/Error";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";

import Dashboard from "./pages/Dashboard/Dashboard";
import AuthForm from "./pages/AuthForm/AuthForm";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import CategoryProducts from './pages/CategoryProducts/CategoryProducts';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';

import PrivateRoute from './utils/PrivateRoute';
import Categories from './pages/Categories/Categories';
import jwtLogout from './utils/jwtLogout';

const App = () => {

  const { user } = useContext(AuthContext);

  useEffect(() => {
    jwtLogout(user.token);
  }, [user.token])

  return (
    <Router>
      <PageScroll />
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/categories">
          <Categories />
        </Route>
        <Route exact path="/category/:title">
          <CategoryProducts />
        </Route>
        <Route path="/product/:id">
          <SingleProduct />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/wishlist">
          <Wishlist />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/order/:orderId">
          <OrderSuccess />
        </Route>
        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route exact path="/login">
          {user.token ? <Redirect to="/dashboard" /> : <AuthForm />}
        </Route>

        <Route path="*">
          <Error content="Page Not FOund!" />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
