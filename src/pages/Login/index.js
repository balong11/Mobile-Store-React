import React, { useState } from "react";
import { loginCustomer } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn } from "../../redux-setup/reducers/auth";
import { useDispatch } from "react-redux";


const Login = () => {
  const [inputLogin, setInputLogin] = useState({});
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeInputs = (e) => {
    const { name, value } = e.target;
    return setInputLogin({ ...inputLogin, [name]: value });
  };
  const clickLogin = (e) => {
    e.preventDefault();
    loginCustomer(inputLogin)
      .then(({ data }) => {
        setAlert("đăng nhập tài khoản thành công");
        setStatus(!alert);
        setInputLogin({});
        return dispatch(loggedIn(data));
      })
      .catch((error) => {
        if (error.response.data === "email not valid")
          return setAlert("Thông tin email không tồn tại!");
        if (error.response.data === "password not valid")
          return setAlert("Thông tin mật khẩu không hợp lệ!");

        console.log(error);
      });
  };
  return (
    <>
      <div id="customer">
        {alert && (
          <div
            className={`alert ${
              status ? "alert-success" : "alert-danger"
            } text-center`}
          >
            {alert}
          </div>
        )}
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputLogin.email || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
                value={inputLogin.password || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link onClick={clickLogin} to="#">
              <b>Đăng nhập ngay</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
