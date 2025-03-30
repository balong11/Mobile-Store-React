import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategory, getProductsCategories } from "../../services/Api";
import ProductItems from "../../shared/components/product-items";



const Category = () => {
  const { id } = useParams();
  const [products, setProduct] = useState([]);
  const [total, setTotal] = useState([])
  const [category, setCategory] = useState("")
  useEffect(() => {
    getProductsCategories(id, {
      param: {
        limit: 12,
      }

    })
      .then(({ data }) => {
        setProduct(data.data.docs)
        setTotal(data.data.pages.total)
      })
      .catch((err) => console.log(err));

    getCategory(id)
      .then(({ data }) => setCategory(data.data.name))
      .catch((errr) => console.log(errr));
      
  }, [id]);
  return (
    <>
      <div>
        <div className="products">
          <h3>{category} (hiện có {total} sản phẩm)</h3>
          <div className="product-list card-deck">
            {products.map((item, index) => (
              <ProductItems key={item} item={item} />
            ))}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Trang trước
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Trang sau
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Category;
