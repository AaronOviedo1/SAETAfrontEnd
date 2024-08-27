import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ClientesPage from "../pages/clientesPage";
import ErrorPage from "../pages/ErrorPage";
import CursosPage from "../pages/cursosPage";
import RegistroCliente from "../pages/RegistroCliente";  // Asegúrate de que la ruta es correcta
import TransaccionesPage from "../pages/transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients",
    element: <ClientesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/courses",
    element: <CursosPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registro",  // Esta es la nueva ruta para el registro de clientes
    element: <RegistroCliente />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/transacciones",  // Esta es la nueva ruta para el registro de clientes
    element: <TransaccionesPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
