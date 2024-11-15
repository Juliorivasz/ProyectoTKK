import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containets/pages/Home";
import Error404 from "./containets/errors/Error404";
import { UserProvider } from "./context/UserContext";
import AuthRoutes from "./routes/AuthRoutes"; // Importa las rutas de autenticación
import { RegisterUser } from "./containets/pages/RegisterUser";
import DireccionesPage from "./components/navigation/DireccionesPage";
const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser/>}/>
          <Route path="/auth/*" element={<AuthRoutes />} /> {/* Rutas de autenticación */}
          <Route path="/direcciones" element={<DireccionesPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
