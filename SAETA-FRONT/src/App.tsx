import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div>
      <div className="sidebar">
        <div className="header">
          <img src="src/images/SaetaLogo.png" alt="Profile" /> {/* Reemplaza 'path-to-your-image.jpg' con la ruta a tu imagen */}
          <h1>SAETA</h1>
          <h2>Instituto Francisco Javier Saeta</h2>
        </div>
        <div className="menu">
          <a href="#option1">Opción 1</a>
          <a href="#option2">Opción 2</a>
          <a href="#option3">Opción 3</a>
          <a href="#option4">Opción 4</a>
        </div>
      </div>
      <div className="content">
        {/* Aquí puedes añadir más contenido para tu dashboard */}
        <h1>Bienvenido al Dashboard</h1>
        <p>Contenido del dashboard...</p>
      </div>
    </div>
  );
}

export default App;
