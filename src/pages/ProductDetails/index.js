import React, { useEffect, useState } from "react";
import {getCommentsProduct, getProduct, createCommentsProduct } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux-setup/reducers/cart";

export const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [inputsForm, setInputsForm] = useState({});
  //them gio hang
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickAddToCart = (type) => {
    dispatch(addToCart({
      _id: id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    }));
    if(type==="buy-now"){
      return navigate("/Cart");
    }

  }
  const changeInput = (e) => {
    const { name, value } = e.target;
    // console.log(inputsForm);

    return setInputsForm({ ...inputsForm, [name]: value });
  };
  const clickSubmit = (e) => {
    e.preventDefault();

    //create comment
    createCommentsProduct(id, inputsForm)
      .then(({ data }) => {
        if (data.status === "success") {
          getComment(id);
          return setInputsForm("");
        }
      })
      .catch((err) => console.log(err));
  };
  const getComment = (id) => {
    getCommentsProduct(id)
      .then(({ data }) => setComments(data.data.docs))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //get product
    getProduct(id)
      .then(({ data }) => setProduct(data.data))
      .catch((err) => console.log(err));

    //get comment
    getComment(id);
  }, []);

  return (
    <>
      <div>
        <div id="product">
          <div id="product-head" className="row">
            <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
              <img src={getImageProduct(product.image)} />
            </div>
            <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
              <h1>{product.name}</h1>
              <ul>
                <li>
                  <span>Bảo hành:</span> 12 Tháng
                </li>
                <li>
                  <span>Đi kèm:</span> {product.accessories}
                </li>
                <li>
                  <span>Tình trạng:</span> {product.status}
                </li>
                <li>
                  <span>Khuyến Mại:</span> {product.promotion}
                </li>
                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                <li id="price-number">{product.price}</li>
                <li
                  className={product.is_stock ? "" : "text-danger"}
                  id="status"
                >
                  {product.is_stock ? "còn hàng" : "hết hàng"}
                </li>
              </ul>
              {product.is_stock && (
                <div id="add-cart">
                  <button
                    onClick={() => clickAddToCart("buy-now")}
                    className="btn btn-warning mr-2"
                  >
                    Mua ngay
                  </button>

                  <button onClick={clickAddToCart} className="btn btn-info">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              )}
            </div>
          </div>
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>{product.name}</h3>
              {product.details}
            </div>
          </div>
          {/*	Comment	*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Bình luận sản phẩm</h3>
              <form method="post">
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    onChange={changeInput}
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    value={inputsForm.name || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    onChange={changeInput}
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="pwd"
                    value={inputsForm.email || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung:</label>
                  <textarea
                    onChange={changeInput}
                    name="content"
                    required
                    rows={8}
                    className="form-control"
                    value={inputsForm.content || ""}
                  />
                </div>
                <button
                  onClick={clickSubmit}
                  type="submit"
                  name="sbm"
                  className="btn btn-primary"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          {/*	End Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comments.map((item, index) => (
                <div key={index} className="comment-item">
                  <ul>
                    <li>
                      <b>{item.name}</b>
                    </li>
                    <li>
                      {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </li>
                    <li>
                      <p>{item.content}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
        <div id="pagination">
          <ul className="pagination">
            <li className="page-item">
              <Link className="page-link" to="#">
                Trang trước
              </Link>
            </li>
            <li className="page-item active">
              <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                Trang sau
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
