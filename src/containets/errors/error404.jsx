import Layout from "../../components/layouts/Layout";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen -mt-24 -mb-24 bg-gradient-to-br from-[#022736] to-[#00695C] text-white text-center">
        <h1 className="text-9xl font-extrabold animate-pulse drop-shadow-lg">404</h1>
        <p className="text-2xl mt-4 font-semibold drop-shadow-md">
          ¡Oops! Página no encontrada.
        </p>
        <p className="text-lg mt-2 max-w-lg drop-shadow-md">
          Parece que el enlace que seguiste no existe o fue eliminado.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-[#CDE8E5] text-[#022736] font-bold rounded-lg shadow-md hover:bg-[#A5C3BF] transition duration-300"
          >
            Regresar al Inicio
          </Link>
        </div>
      </div>
    </Layout>
  );
}






