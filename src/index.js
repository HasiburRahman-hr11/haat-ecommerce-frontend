import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductContextProvider from './Context/ProductContext';
import CartContextProvider from './Context/CartContext';
import WishlistContextProvider from './Context/WishlistContext';
import CategoryContextProvider from './Context/CategoryContext';
import AuthContextProvider from './Context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <App />
            </WishlistContextProvider>
          </CartContextProvider>
        </CategoryContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
