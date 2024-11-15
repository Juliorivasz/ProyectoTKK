export async function getProducts() {
  try {
    const response = await fetch('http://localhost:8080/producto/actualizarPrecios');
    const data = await response.json();
    return data; // Retorna todo el objeto tal cual como está, con la propiedad 'precios'
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return { precios: [] }; // En caso de error, retornamos un array vacío
  }
}


