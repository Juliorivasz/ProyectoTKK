export const payMercadoPago = async (body) => {
    try {
        const response = await fetch("http://localhost:3000/api/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body), // Enviar el cuerpo correcto
        });

        if (!response.ok) {
            throw new Error("Error al crear la preferencia de Mercado Pago");
        }

        const responseData = await response.json();
        console.log("Respuesta del backend:", responseData);
        return responseData.id; // Retornar el ID de la preferencia

    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

// obtiene el precio de la moneda que eliga de binance, abreviada
export const getCryptoPrice = async (baseCurrency='BTC', quotedCurrency='ARS') => {

    const currecyOrigin = baseCurrency.toUpperCase();
    const currecyDestiny = quotedCurrency.toUpperCase();
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${currecyOrigin}${currecyDestiny}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el precio la moneda:", error);
        return null;
    }

}