import { useEffect, useState } from "react";
import { getProducts } from "../../libs/actions/products";
import ProductCard from "../products/ProductCard"

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productos = await getProducts();
      setProducts(productos);
    }

    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className="pt-14 px-14">
      <div>
        <h1 className="text-6xl font-bold">Categoria</h1>
        {/* Aquí podrías mapear los productos */}
        <section className="grid grid-cols-4 pt-7 gap-x-4">
        { products.length > 0 && products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
        </section>
      </div>
    </div>
  );
}
