import { useEffect, useState } from "react";
import { getProducts } from "../../libs/actions/products"; // Asegúrate de tener el endpoint correcto
import ProductCard from "../products/ProductCard";

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts(); // Ahora no pasamos 'category', solo obtenemos todos los productos
      console.log(data);
      setProducts(data.precios || []); // Asegúrate de acceder a la propiedad 'precios'
    }

    fetchProducts();
  }, []); // El array vacío asegura que solo se haga la llamada una vez al cargar el componente

  return (
    <div className="pt-14 px-6 md:px-14">
      <div>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Productos</h1>
        {/* Todos los productos */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.nombreProducto} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No hay productos disponibles</p>
          )}
        </section>
      </div>
    </div>
  );
}





