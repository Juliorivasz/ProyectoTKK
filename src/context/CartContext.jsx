/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage al inicializar
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart && storedCart.length > 0) {
      setCart(storedCart);
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.nombreProducto === product.nombreProducto
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.nombreProducto === product.nombreProducto
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productName, quantityChange) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.nombreProducto === productName
            ? { ...item, quantity: item.quantity + quantityChange }
            : item
        )
        .filter((item) => item.quantity > 0) // Elimina productos con cantidad <= 0
    );
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productName) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.nombreProducto !== productName)
    );
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular el número total de productos en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calcular el precio total del carrito
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);


