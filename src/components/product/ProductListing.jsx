import Dropdown from "../actions/Dropdown";
import SearchBox from "../actions/SearchBox";
import ProductCard from "./ProductCard";
import { useState } from "react";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

export default function ProductListing({ products }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filteredList, setFilteredList] = useState([...products]);

  function filterList(phrase = "") {
    setSearchPhrase(phrase);

    if (products.length > 0 && phrase != "") {
      setFilteredList(
        [...products].filter(
          (product) =>
            product.name.toLowerCase().includes(phrase.toLowerCase()) ||
            product.description.toLowerCase().includes(phrase.toLowerCase()),
        ),
      );
    } else {
      setFilteredList([...products]);
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox
          label="Search"
          placeholder="Search products..."
          value={searchPhrase}
          onSearch={filterList}
        />
        <Dropdown label="Sort by" options={sortList} value="Popularity" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredList.length > 0 ? (
          filteredList.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-xl text-primary col-span-3">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
