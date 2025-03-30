import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/components/Layout/Header";
import Footer from "./shared/components/Layout/Footer";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import store from "./redux-setup/store";
import { Provider } from "react-redux";


export const App = () => {
  return (
    <Provider store = {store}>
    <BrowserRouter>

        {/*	Header	*/}
        <Header />
        {/*	End Header	*/}
        {/*	Body	*/}
        <div id="body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <Menu />
              </div>
            </div>
            <div className="row">
              <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                {/*	Slider	*/}
                <Slider />
                {/*	End Slider	*/}
                {/*	Feature Product	*/}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Category-:id" element={<Category />} />
                  <Route path="/Search" element={<Search />} />
                  <Route path="/ProductDetails-:id" element={<ProductDetails />} />
                  <Route path="/Success" element={<Success />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {/*	End Latest Product	*/}
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
        {/*	End Body	*/}
        <Footer />

    </BrowserRouter>
    </Provider>
  );
};

export default App;
