import { Outlet } from "react-router";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import saetaLogo from './images/saetaLogo.png'; // Asegúrate de que la ruta sea correcta

interface Props {}

const App = (props: Props) => {
  return (
    <>
      {/* Aquí integro el contenido del ProductPage */}
      <div className="container">
        <div className="columns is-centered">
          <div className="column1 is-3">
            <div className="box has-background-primary-light">
              <h2 className="subtitle has-text-centered"><Link to="/Clients">CLIENTES</Link></h2>
            </div>
            <div className="box has-background-primary-light">
              <h2 className="subtitle has-text-centered"><Link to="/Courses">CURSOS</Link></h2>
            </div>
            <div className="box has-background-primary-light">
              <h2 className="subtitle has-text-centered"><Link to="/Transacciones">TRANSACCIONES</Link></h2>
            </div>
          </div>
          <div className="column is-9">
            <div className="columns is-multiline">
              <div className="column is-12 has-text-centered">
                <div className="box">
                  <h1 className="title">SAETA</h1>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-white-bis">
                  <h2 className="subtitle has-text-centered">PAGOS EFECTIVO</h2>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-white-bis">
                  <h2 className="subtitle has-text-centered">PAGOS TRANSFERENCIA</h2>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-white-bis">
                  <h2 className="subtitle has-text-centered">GRÁFICA DE CURSOS</h2>
                </div>
              </div>
              <div className="column is-4">
                <div className="box has-background-white-bis">
                  <h2 className="subtitle has-text-centered">BALANCE TOTAL</h2>
                </div>
              </div>
              <div className="column is-12 has-text-centered">
                <figure className="image is-128x128 is-inline-block">
                  <img src={saetaLogo} alt="Logo SAETA" className="large-image" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aquí se renderizan los otros componentes basados en las rutas */}
      <Outlet />
    </>
  );
};

export default App;
