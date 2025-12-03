import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;