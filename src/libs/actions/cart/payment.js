import { getCryptoPrice, payMercadoPago } from "./payments-methods";

// obtiene los datos del carrito
export const dataCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        return {
            unit_price: 0,
            quantity: 0,
            title: "Carrito vacío",
            currency_id: "ARS",
        };
    }

    // Calcular el monto total y crear el título concatenado
    const unit_price = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    const title = cart.map((item) => item.nombreProducto).join(", ");
    const currency_id = "ARS";

    return {
        unit_price,
        quantity,
        title,
        currency_id
    };
};

// realiza el calculo de la unidad en la moneda seleccionada
export const  calculateTotalCrypto= async (priceTotal) => {
    const totalPesos = priceTotal;
    const dataMoney = await getCryptoPrice("btc", 'ars');
    const priceCrypto = parseFloat(dataMoney.price, 2);

    if (priceCrypto) {
        const totalCrypto = totalPesos / priceCrypto;
        return { totalPesos, totalCrypto };
    } else {
        throw new Error("No se pudo obtener el precio de la moneda");
    }
};

export const convertCurrency = async () => {
    const {unit_price} = dataCart();
    const currencyConverted = await calculateTotalCrypto(unit_price);
    return currencyConverted;
}


export async function sendCartDataToBackend() {
    const {title, unit_price, currency_id} = dataCart();
    const quantity = 1;

    const body = {
        title, 
        quantity, 
        unit_price, 
        currency_id,
    };
    
    const id = await payMercadoPago(body);

    return id;
}



