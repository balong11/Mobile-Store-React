import React, { useEffect, useState } from "react";
import { getOrderDetail } from "../../services/Api";
import { useParams } from "react-router-dom";
import { formatPrice, getImageProduct } from "../../shared/ultils";

const OrderDetails = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getOrderDetail(id)
      .then(({ data }) => setOrderDetail(data.data))
    //   .then(({ data }) => console.log(data.data.item))
      
      .catch((err) => console.log(err));
  });
  return (
    <>
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Số lượng
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {orderDetail.items?.map((item, index) => (
            <div key={index} className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)} />
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <p>{item.qty}</p>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPrice(item.price * item.qty)}</b>
              </div>
            </div>
          ))}
          
          
        </form>
      </div>
    </>
  );
};

export default OrderDetails;
