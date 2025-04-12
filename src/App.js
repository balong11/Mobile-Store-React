import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/components/Layout/Header";
import Footer from "./shared/components/Layout/Footer";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import store, { persistor } from "./redux-setup/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import routers from "./routers";

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
                    {routers.map((item, index) => (
                      <Route
                        key={index}
                        path={item.path}
                        element={<item.element />}
                      />
                    ))}
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
      </PersistGate>
    </Provider>
  );
};

export default App;
