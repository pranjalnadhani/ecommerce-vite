import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  function loadProducts(urlParams = new URLSearchParams()) {
    fetch(`http://localhost:3000/api/products?${urlParams}`)
      .then((response) => response.json())
      .then((response) => setProducts(response.data.products));
  }

  function searchProducts(event) {
    const searchValue = event.target.value;

    const urlParams = new URLSearchParams();
    urlParams.append("q", searchValue);
    if (selectedCategory) {
      urlParams.append("category", selectedCategory);
    }

    loadProducts(urlParams);
    setSearchText(searchValue);
  }

  function applyFilter(event) {
    const category = event.target.dataset.category;

    const urlParams = new URLSearchParams();
    urlParams.append("q", searchText);
    if (category !== selectedCategory) {
      urlParams.append("category", category);
    }

    loadProducts(urlParams);
    setSelectedCategory(category !== selectedCategory ? category : undefined);
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((response) => setCategories(response.data.categories));
    loadProducts();
  }, []);

  return (
    <div className="m-4">
      <div className="bg-gray-200 rounded-lg px-4 py-3 flex justify-between border border-gray-300">
        <input
          type="search"
          name="search"
          id="search-products"
          placeholder="Search products..."
          className="rounded-lg px-3 border border-gray-300"
          value={searchText}
          onChange={searchProducts}
        />
        <div className="flex gap-x-2">
          {categories.map((category) => (
            <button
              key={category}
              data-category={category}
              data-selected={selectedCategory === category}
              className="bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg data-[selected=true]:bg-gray-500 data-[selected=true]:text-white data-[selected=true]:border-gray-950"
              onClick={applyFilter}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="border border-gray-300 bg-gray-200 rounded-lg p-4"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-64 w-full object-contain p-4 bg-white rounded-lg"
            />
            <h2 className="text-gray-900 font-medium mt-2 text-sm h-5 overflow-y-hidden text-ellipsis whitespace-nowrap">
              {product.title}
            </h2>
            <p className="text-gray-700 mt-1 text-xs">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
