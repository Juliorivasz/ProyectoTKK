import Home from "../containets/pages/dashboard/contable/Home";
import Gastos from "../containets/pages/dashboard/contable/CargarGasto";
import GastosIngresados from "../containets/pages/dashboard/contable/GastosIngresados";

import LibroMayor from "../containets/pages/dashboard/contable/LibroMayor";
import LibroDiario from "../containets/pages/dashboard/contable/LibroDiario";
import Ganancias from "../containets/pages/dashboard/contable/Ganancias.JSX";

export const contableRoutes = [
  {
    path: "contable/",
    element: <Home />,
  },
  {
    path: "contable/cargar-gasto/",
    element: <Gastos />,
  },
  {
    path: "contable/gastos/",
    element: <GastosIngresados />,
  },
  {
    path: "contable/libro-mayor/",
    element: <LibroMayor />,
  },
  {
    path: "contable/libro-diario/",
    element: <LibroDiario />,
  },
   {
    path: "contable/ganancias/",
    element: <Ganancias />,
  },

]