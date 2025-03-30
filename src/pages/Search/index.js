import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import { useSearchParams } from "react-router-dom";
import ProductItems from "../../shared/components/product-items";
import { limit } from "../../shared/constants/app";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
  const [pages,setPages] = useState({});
  const [products, setProducts] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const keyword = searchParam.get("keyword");
  const page = Number(searchParam.get("page")) || 1
  useEffect(() => {
    getProducts({
      params: {
        limit,
        page,
        name: keyword,
      }
    })
      .then(({data}) => {
        setProducts(data.data.docs);
        console.log(keyword);
        console.log(data.data.pages);
        
        setPages(data.data.pages)
      })
      .catch((err) => console.log(err))
  }, [keyword, page]);
  return (
    <>
      <div>
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm{" "}
            <span>{keyword}</span>
          </div>
          <div className="product-list card-deck">
           
              {products.map((item, index) => (
                <ProductItems item={item} key={item} />
              ))}
         
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <Pagination pages = {pages} />
        </div>
      </div>
    </>
  );
};
export default Search;
