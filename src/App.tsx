import { useState } from "react";
import Medicamentos from "./components/Medicamentos";
import Categorias from "./components/Categorias";
import Empleados from "./components/Empleados";

type Vista = "medicamentos" | "categorias" | "empleados";

function App() {
  const [vista, setVista] = useState<Vista>("medicamentos");

  return (
    <>
      <h1>Farmacia</h1>
      <p className="subtitulo">Sistema de gestión</p>

      <nav>
        <button
          className={vista === "medicamentos" ? "activo" : ""}
          onClick={() => setVista("medicamentos")}
        >
          Medicamentos
        </button>
        <button
          className={vista === "categorias" ? "activo" : ""}
          onClick={() => setVista("categorias")}
        >
          Categorías
        </button>
        <button
          className={vista === "empleados" ? "activo" : ""}
          onClick={() => setVista("empleados")}
        >
          Empleados
        </button>
      </nav>

      {vista === "medicamentos" && <Medicamentos />}
      {vista === "categorias" && <Categorias />}
      {vista === "empleados" && <Empleados />}
    </>
  );
}

export default App;
