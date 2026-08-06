import Dropdown from "../actions/Dropdown";
import SearchBox from "../actions/SearchBox";
import ProductCard from "./ProductCard";

export default function ProductListing({ products }) {
  const sortList = ["Popularity", "Price Low to High", "Price High to Low"];
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox label="Search" placeholder="Search products..." value="" />
        <Dropdown label="Sort by" options={sortList} value="Popularity" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-xl text-primary">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
