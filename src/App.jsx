import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containets/pages/Home";
import Error404 from "./containets/errors/Error404";
import { UserProvider } from "./context/UserContext";
import AuthRoutes from "./routes/AuthRoutes"; // Importa las rutas de autenticación
import DireccionesPage from "./components/navigation/DireccionesPage";
import ModificarCosto from "./containets/pages/dashboard/contable/ModificarCosto"
import RecargarStock from "./containets/pages/dashboard/contable/RecargarStock"
const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthRoutes />} /> {/* Rutas de autenticación */}
          <Route path="/direcciones" element={<DireccionesPage />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/modificarCostos" element={<ModificarCosto />} />
          <Route path="/recargarStock" element={<RecargarStock />} />
          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
