import React, { useState } from "react";
import { registerCustomer } from "../../services/Api";
import { Link } from "react-router-dom";

const Register = () => {
  const [inputForm, setInputForm] = useState({});
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(false);
  const changeInput = (e) => {
    const { name, value } = e.target;
    return setInputForm({ ...inputForm, [name]: value });
  };
  const clickRegister = (e) => {
    e.preventDefault();
    registerCustomer(inputForm)
      .then(({ data }) => {
        setAlert("đăng ký tài khoản thành công");
        setStatus(!alert);
        setInputForm({});
      })
      .catch((error) => {
        if (error.response.data === "email exists")
            return setAlert("Thông tin email không hợp lệ!");
        if (error.response.data === "phone exists")
          return setAlert("Thông tin sdt không hợp lệ!");
        return console.log(error);
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
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
                value={inputForm.fullName || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
                value={inputForm.password || ""}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputForm.email || ""}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
                value={inputForm.phone || ""}
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
                value={inputForm.address || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div
            onClick={clickRegister}
            className="by-now col-lg-6 col-md-6 col-sm-12"
          >
            <Link to="#">
              <b>Đăng ký ngay</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="#">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
