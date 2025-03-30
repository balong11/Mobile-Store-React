import { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import ProductItems from "../../shared/components/product-items";
const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featureProducts, setFeatureProduct] = useState([])
  useEffect(() => {
    //san phẩm mới
    getProducts({
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => setLatestProducts(data.data.docs))
      .catch((err) => console.log(err));


    
    //san phẩm mới
    getProducts({
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => setFeatureProduct(data.data.docs))
      .catch((err) => console.log(err));


  }, []);

  return (
    <>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {
            featureProducts.map((item, index) =>(
              <ProductItems key={index} item={item} />
            ))
          }
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {latestProducts.map((item, index) => (
            <ProductItems key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
