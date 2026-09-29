import { useState } from "react";
import Medicamentos from "./components/Medicamentos";
import Categorias from "./components/Categorias";
import Empleados from "./components/Empleados";
import Dashboard from "./components/Dashboard";

type Vista = "dashboard" | "medicamentos" | "categorias" | "empleados";

function App() {
  const [vista, setVista] = useState<Vista>("medicamentos");

  return (
    <>
      <h1>Farmacia</h1>
      <p className="subtitulo">Sistema de gestión</p>

      <nav>
        <button
          className={vista === "dashboard" ? "activo" : ""}
          onClick={() => setVista("dashboard")}
        >
          Dashboard
        </button>
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
      {vista === "dashboard" && <Dashboard />}
      {vista === "medicamentos" && <Medicamentos />}
      {vista === "categorias" && <Categorias />}
      {vista === "empleados" && <Empleados />}
    </>
  );
}

export default App;
