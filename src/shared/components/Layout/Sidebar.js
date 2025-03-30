import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
          <div className="banner-item">
            <Link to="#">
              <img className="img-fluid" src="images/banner-1.png" />
            </Link>
          </div>
          <div className="banner-item">
            <Link to="#">
              <img className="img-fluid" src="images/banner-2.png" />
            </Link>
          </div>
          <div className="banner-item">
            <Link to="#">
              <img className="img-fluid" src="images/banner-3.png" />
            </Link>
          </div>
          <div className="banner-item">
            <Link to="#">
              <img className="img-fluid" src="images/banner-4.png" />
            </Link>
          </div>
          <div className="banner-item">
            <a to="#">
              <img className="img-fluid" src="images/banner-5.png" />
            </a>
          </div>
          <div className="banner-item">
            <Link to="#">
              <img className="img-fluid" src="images/banner-6.png" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar
