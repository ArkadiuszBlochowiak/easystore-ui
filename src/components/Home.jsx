import PageHeading from "./heading/PageHeading";
import ProductListing from "./product/ProductListing";
// import { products } from "../data/product";
import apiClients from "../api/apiClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await apiClients.get("/products");
    setProducts(response.data);
  };

  return (
    <div className="home-container">
      <PageHeading title="Explore Eazy Stickers!">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      <ProductListing products={products} />
    </div>
  );
}
