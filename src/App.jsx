import './App.css'
import { Route, Routes } from 'react-router-dom'

import CartPage from "./pages/CartPage";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Layout from './Layout/Layout';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/settings' element={<Setting />} />

      </Route>

    </Routes >
  )
}

export default App
