import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tkk from "/images/TKK.svg";
import { FaShoppingCart } from "react-icons/fa";
import AuthButton from "../../components/navigation/AuthButton";
import { useUser } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";
import { getProducts } from "../../libs/actions/products";

export default function Navbar() {
  const { user } = useUser();
  const { totalItems } = useCart();
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setAllProducts(productsData.precios || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.",
        });
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = allProducts.filter(product =>
        product.nombreProducto.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [search, allProducts]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="bg-nav py-2.5 px-5 flex flex-wrap w-full fixed items-center gap-x-4 justify-between z-10">
      <div className="flex gap-x-4 items-center">
        <img src={tkk} alt="logo" className="w-20 h-auto" />

        {/* Envío a Dirección */}
        <div>
          <h1 className="text-white">Envío a</h1>
          <h1 className="text-white">Godoy Cruz</h1>
        </div>
      </div>

      {/* Navegación */}
      <div className="text-white flex gap-x-6">
        <Link to="/">Inicio</Link>
        <Link to="/promociones">Promociones</Link>
        <Link to="/pedidos">Pedidos</Link>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative w-full md:w-64 mt-4 md:mt-0">
        <input
          type="search"
          placeholder="Buscar producto..."
          className="w-full p-2 rounded-lg text-black"
          value={search}
          onChange={handleSearch}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
        {isSearchFocused && filteredProducts.length > 0 && (
          <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                <h3 className="font-semibold">{product.nombreProducto}</h3>
                <p className="text-sm text-gray-600">{product.descripcion}</p>
                <p className="text-green-600 font-bold">${product.precio}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Carrito */}
      <Link to={"/auth/carrito"} className="ml-4">
        <div className="relative flex items-center text-white">
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </Link>

      {/* Avatar User */}
      <AuthButton />
    </nav>
  );
}