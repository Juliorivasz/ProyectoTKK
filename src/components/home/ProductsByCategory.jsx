/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getProducts } from "../../libs/actions/products";
import ProductCard from "../products/ProductCard"

export default function ProductsByCategory({category}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productos = await getProducts(category);
      setProducts(productos);
    }

    fetchProducts();
  }, [category]);

  return (
    <div className="pt-14 px-14">
      <div>
        <h1 className="text-6xl font-bold capitalize">{category}</h1>
        {/* Todos los productos */}
        <section className="grid grid-cols-4 pt-7 gap-x-4">
        { products.length > 0 && products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
        </section>
      </div>
    </div>
  );
}
