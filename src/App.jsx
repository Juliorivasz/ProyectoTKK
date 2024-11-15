import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containets/pages/Home";
import Error404 from "./containets/errors/Error404";
import { UserProvider } from "./context/UserContext";
import AuthRoutes from "./routes/AuthRoutes"; // Importa las rutas de autenticación

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Usa AuthRoutes para manejar todas las rutas de autenticación */}
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
