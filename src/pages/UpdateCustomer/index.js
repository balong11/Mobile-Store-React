import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../services/Api";
import { updatedCustomer } from "../../redux-setup/reducers/auth";

const UpdateCustomer = () => {
  const currentCustomer = useSelector(({ auth }) => auth.login.currentCustomer);
  const [customer, setCustomer] = useState(currentCustomer.customer);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const changeInputs = (e) => {
    const { name, value } = e.target;
    return setCustomer({ ...customer, [name]: value });
  };
  const clickUpdate = (e) => {
    e.preventDefault();
    updateCustomer(customer._id, customer)
      .then(() => {
        setAlert("Cập nhật thông tin thành công!");
        setStatus(!alert);
        return dispatch(updatedCustomer(customer));
      })
      .catch((err) => {
        if (err.response.data === "phone exists") {
          return setAlert("Số điện thoại đã tồn tại!");
        }

        console.log(err);
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

        <h3 className="text-center">Thông tin tài khoản</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                value={customer?.fullName}
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                disabled
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                value={customer?.password}
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                disabled
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                value={customer?.email}
                required
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                value={customer?.phone}
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                value={customer?.address}
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickUpdate} href="#">
              <b>Cập nhật ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="/">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCustomer;
