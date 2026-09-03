import PageHeading from "../../../components/heading/PageHeading";
import ProductListing from "./product/ProductListing";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const products = useLoaderData();

  return (
    <div className="grow max-w-6xl mx-auto px-6 py-8">
      <PageHeading title="Explore Eazy Stickers!">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      <ProductListing products={products} />
    </div>
  );
}
