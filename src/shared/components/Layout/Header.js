import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const totalCart = useSelector(({ cart }) =>
    cart.items.reduce((total, item) => total + item.qty, 0)
  );
  const changeKeyword = (e) => setKeyword(e.target.value);
  const clickSearch = (e) => {
    e.preventDefault();
    return navigate(`/Search?keyword=${keyword}`);
  };
  return (
    <>
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/">
                  <img className="img-fluid" src="images/logo.png" />
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-4 col-md-12 col-sm-12">
              <form className="form-inline">
                <input
                  onChange={changeKeyword}
                  className="form-control mt-3"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
                <button
                  onClick={clickSearch}
                  className="btn btn-danger mt-3"
                  type="submit"
                >
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              <i className="fa-solid fa-user mr-1" />
              <Link className="mr-2" to="#">
                đăng nhập
              </Link>
              |
              <Link className="mr-2 ml-2" to="#">
                đăng ký
              </Link>
              |
              <Link className="mt-4 mr-2 ml-2" to="/cart">
                giỏ hàng
                <ul>
                  <li>
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart" /> Giỏ hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fas fa-file-alt" /> Đơn hàng đã mua
                    </Link>
                  </li>
                </ul>
              </Link>
              <span className="mt-3">{totalCart}</span>
            </div>
          </div>
        </div>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler navbar-light"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </>
  );
};

export default Header;
