import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBanners } from "../../../services/Api";
import { getImageBanner } from "../../ultils";

export const Sidebar = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    getBanners({
      params: {
        sort: 1,
        limit: 10,
      },
    })
      .then(({ data }) => setBanners(data.data.docs))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
          {banners.map((item, index) => (
            <div key={index} className="banner-item">
              <Link to="#">
                <img className="img-fluid" src={getImageBanner(item.image)} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
