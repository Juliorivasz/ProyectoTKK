/* eslint-disable no-unused-vars */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { initMercadoPago } from "@mercadopago/sdk-react";
import {
  convertCurrency,
  sendCartDataToBackend,
} from "../../../libs/actions/cart/payment";
import OrderConfirmation from "../payment/OrderConfirmation";
import SuccessMessage from "./SucessMessage";
import BinancePayment from "../payment/Binance";
import Layout from "../../../components/layouts/Layout";
import { Cart } from "./Cart";
import {AddressPayment} from "./AddressPayment";
import { useCart } from "../../../context/CartContext";

const steps = [
  "Revisión del Carrito",
  "Dirección y Método de pago",
  "Confirmación del Pedido",
];

export default function StepperPay() {
  initMercadoPago("TEST-d98ac793-37db-40e9-b9f4-7eaac513331f", {
    locale: "es-AR",
  });
  const [preferenceId, setPreferenceId] = React.useState(null);
  const dataUser = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = React.useState(dataUser.email);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const navigate = useNavigate();

  const handleBuy = async () => {
    const id = await sendCartDataToBackend();
    console.log(id);
    if (id) {
      setPreferenceId(id);
    }
  };

  const handleBinance = async () => {
    const moneyDestiny = (await convertCurrency()).totalCrypto;
    const moneyOrigin = (await convertCurrency()).totalPesos;

    console.log(`Pesos argentinos: ${moneyOrigin}, bitcoin: ${moneyDestiny}`);
  };

  const { cart } = useCart()
  const [isAddressSelected, setIsAddressSelected] = React.useState(false);
  const [addressSelect, setAddressSelect] = React.useState("");
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] =
    React.useState(false);
  const [methodPaySelect, setMethodPaySelect] = React.useState(
    localStorage.getItem("paymentMethod")
  );
  const [selectProducts, setSelectProducts] = React.useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  React.useEffect(() => {
    // Actualizamos el estado selectProducts cuando cambia el carrito
    setSelectProducts(cart);
  }, [cart]);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === 1) {
      const updatedCart = JSON.parse(localStorage.getItem("cart"));
      setSelectProducts(updatedCart);
    }
  };

  const handleMethodPay = (method) => {
    setIsPaymentMethodSelected(true);
    setMethodPaySelect(method);
    if (method === "MercadoPago" && !preferenceId) {
      handleBuy();
    } else if (method === "MercadoPago") {
      handleBuy();
    }
    if (method === "Binance") {
      handleBinance();
    }
  };

  const resetPaymentPreference = () => {
    setAddressSelect("");
    setMethodPaySelect("");
  };

  const handleAddress = (address) => {
    setIsAddressSelected(true);
    setAddressSelect(address);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) {
      resetPaymentPreference();
      const updatedCart = JSON.parse(localStorage.getItem("cart"));
      setSelectProducts(updatedCart);
    }
    setIsAddressSelected(false);
    setIsPaymentMethodSelected(false);
  };

  const handleReset = () => setActiveStep(0);

  const handleGoToMenu = () => {
    navigate("/");
  };

  const isCartEmpty = !selectProducts || selectProducts.length === 0; // Verificar si el carrito está vacío

  const canProceed = () => {
    if (activeStep === 0) return !isCartEmpty;
    if (activeStep === 1) return isAddressSelected && isPaymentMethodSelected;
    if (activeStep === steps.length - 1) return false;
    return true;
  };

  return (
    <Layout>
      <div className="w-full p-4 min-h-[70vh] -mb-20">
        <button
          onClick={handleGoToMenu}
          className="text-black mb-2 flex items-center"
        >
          <ArrowBackIcon className="mr-2" /> Volver al Menú
        </button>

        <div className="w-full flex justify-between mb-6">
          {steps.map((label, index) => {
            const isActiveOrCompleted = activeStep >= index;
            return (
              <div
                key={label}
                className={`text-center py-2 flex flex-col items-center ${
                  isActiveOrCompleted ? "text-orange-500" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${
                    isActiveOrCompleted
                      ? "bg-orange-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm">{label}</span>
              </div>
            );
          })}
        </div>

        {activeStep === steps.length ? (
          <SuccessMessage />
        ) : (
          <>
            {activeStep === 0 && <Cart />}
            {activeStep === 1 && (
              <AddressPayment
                userId={userId}
                onAddressSelected={handleAddress}
                onPaymentMethodSelected={handleMethodPay}
              />
            )}
            {activeStep === 2 && (
              <>
                {methodPaySelect === "MercadoPago" && (
                  <OrderConfirmation
                    address={addressSelect}
                    methodPaySelect={methodPaySelect}
                    preferenceId={preferenceId}
                    products={selectProducts}
                  />
                )}
                {methodPaySelect === "Binance" && <BinancePayment />}
              </>
            )}
            <div className="flex items-center mt-4">
              <button
                onClick={handleBack}
                disabled={activeStep === 0}
                className="flex items-center text-black-900 bg-transparent hover:bg-black-200 px-4 py-2 rounded-lg border border-black-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black-500 disabled:opacity-50 transition-all duration-200 cursor-pointer"
              >
                Atrás
              </button>
              <div className="flex-grow"></div>
              <button
                onClick={handleNext}
                className="text-black bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded disabled:opacity-50"
                disabled={!canProceed()}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
