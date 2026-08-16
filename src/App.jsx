import { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Layout from './Layout/Layout';
import Home from './pages/Home';
import { LoadingState } from './components/common/LoadingState';

// Route-level code splitting: these pages are only downloaded when the
// user actually navigates to them, which keeps the initial bundle small.
const CartPage = lazy(() => import('./pages/CartPage'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));

function App() {
  return (
    <Suspense fallback={<LoadingState message="Loading..." minHeight="60vh" />}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/wishlist' element={<WishlistPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/order-confirmation' element={<OrderConfirmation />} />
        </Route>
      </Routes >
    </Suspense>
  )
}

export default App
