import { useEffect, useState } from "react";
import api from "../api";
import type { Categoria, Empleado, Medicamento } from "../types";

function Dashboard() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    api
      .get<Medicamento[]>("/medicamento")
      .then((res) => setMedicamentos(res.data));
    api.get<Categoria[]>("/categoria").then((res) => setCategorias(res.data));
    api.get<Empleado[]>("/empleado").then((res) => setEmpleados(res.data));
  }, []);
  return (
    <section>
      <h2>Dashboard</h2>

      <div className="tarjetas">
        <div className="tarjeta">
          <span className="numero">{medicamentos.length}</span>
          <span className="etiqueta">Medicamentos</span>
        </div>
        <div className="tarjeta">
          <span className="numero">{categorias.length}</span>
          <span className="etiqueta">Categorías</span>
        </div>
        <div className="tarjeta">
          <span className="numero">{empleados.length}</span>
          <span className="etiqueta">Empleados</span>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
