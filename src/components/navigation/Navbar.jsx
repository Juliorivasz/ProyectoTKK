/* eslint-disable no-unused-vars */
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
  const { totalItems, addToCart } = useCart(); // Asegúrate de usar `addToCart` del contexto
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
  const [quantity, setQuantity] = useState(1); // Estado de la cantidad
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

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
      const filtered = allProducts.filter((product) =>
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

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Establece el producto seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedProduct(null); // Limpia el producto seleccionado
    setQuantity(1); // Reinicia la cantidad
  };

  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "¡Debes iniciar sesión!",
        text: "Por favor, inicia sesión para agregar productos al carrito.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (quantity < 1) {
      Swal.fire({
        icon: "error",
        title: "Cantidad inválida",
        text: "La cantidad debe ser al menos 1.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    addToCart(selectedProduct, quantity); // Agrega el producto al carrito

    Swal.fire({
      icon: "success",
      title: "¡Producto agregado al carrito!",
      text: `${selectedProduct.nombreProducto} ha sido añadido a tu carrito.`,
      confirmButtonText: "Aceptar",
    });

    closeModal(); // Cierra el modal y limpia la selección
  };

  return (
    <>
      <nav className="bg-nav py-2.5 px-5 flex flex-wrap w-full fixed items-center gap-x-4 justify-between z-10">
        <div className="flex gap-x-4 items-center">
          <img src={tkk} alt="logo" className="w-20 h-auto" />
          <div>
            <h1 className="text-white">Envío a</h1>
            <h1 className="text-white">Godoy Cruz</h1>
          </div>
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
                <div
                  key={product.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductClick(product)} // Maneja clic en producto
                >
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

      {/* Modal */}
{isModalOpen && selectedProduct && (
  <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      {/* Imagen del producto */}
      <div className="mb-4">
        <img
          src={selectedProduct.imagen}
          alt={selectedProduct.nombreProducto}
          className="w-full h-auto rounded-lg object-contain"
        />
      </div>

      <h2 className="text-xl font-bold mb-4">{selectedProduct.nombreProducto}</h2>
      <p className="mb-2">{selectedProduct.descripcion}</p>
      <p className="text-green-600 font-bold mb-4">${selectedProduct.precio}</p>
      
      {/* Control de cantidad */}
      <div className="flex items-center mb-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex gap-x-2">
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Agregar al carrito
        </button>
        <button
          onClick={closeModal}
          className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
