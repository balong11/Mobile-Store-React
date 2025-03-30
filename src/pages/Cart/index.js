import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
import { deleteItemCart, updateCart } from "../../redux-setup/reducers/cart";
import { order } from "../../services/Api";

const Cart = () => {
  const itemsCart = useSelector(({ cart }) => cart.items);
  //update cart
  const dispatch = useDispatch();
  const changeQty = (e, id) => {
    const value = Number(e.target.value);
    if (value === 0) {
      // eslint-disable-next-line no-restricted-globals
      const isconfirm = confirm("Bạn có muốn xóa sản phẩm khỏi giỏi hàng không?");
      return isconfirm ? dispatch(deleteItemCart({ _id: id })) : false;
    }
    dispatch(
      updateCart({
        _id: id,
        qty: value,
      })
    );
  };
  //delete cart
  const clickDeleteItem = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn xóa sản phẩm khỏi giỏi hàng không?");
    return isConfirm ? dispatch(deleteItemCart({ _id: id })) : false;
  };
  //order
  const [inputCustomer, setInputCustomer] = useState({});
  const newItemsCart = itemsCart.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));
  const data = {
    ...inputCustomer,
    customer_id: "507f1f77bcf86cd799439011",
    items: newItemsCart,
  };
  const changeInputs = (e) => {
    const { name, value } = e.target;
    return setInputCustomer({
      ...inputCustomer,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const clickOrder = (e) => {
    e.preventDefault();
    console.log(data);

    order(data)
      .then(() => navigate("/Success"))
      .catch((err) => console.log(err));
    
  };
  return (
    <>
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Tùy chọn
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {itemsCart.map((item, index) => (
            <div key={index} className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)} />
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <input
                  onChange={(e) => changeQty(e, item._id)}
                  type="number"
                  id="quantity"
                  className="form-control form-blue quantity"
                  value={item.qty}
                />
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{item.price * item.qty}</b>
                <a onClick={(e) => clickDeleteItem(e, item._id)} href="#">
                  Xóa
                </a>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" />
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>
                {itemsCart.reduce(
                  (total, item) => total + item.qty * item.price,
                  0
                )}
              </b>
            </div>
          </div>
        </form>
      </div>
      <div>
        {/*	Customer Info	*/}
        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={changeInputs}
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="fullName"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={changeInputs}
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  onChange={changeInputs}
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="email"
                  className="form-control"
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
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a onClick={clickOrder} href="#">
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </a>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
};
export default Cart;
