import { useEffect, useState } from "react";
import api from "../api";
import type { Categoria, Empleado, Medicamento } from "../types";

function Dashboard() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const stockBajo = medicamentos.filter((med) => med.stock < 10);

  useEffect(() => {
    api
      .get<Medicamento[]>("/medicamento")
      .then((res) => setMedicamentos(res.data));
    api.get<Categoria[]>("/categoria").then((res) => setCategorias(res.data));
    api.get<Empleado[]>("/empleado").then((res) => setEmpleados(res.data));
  }, []);
  const hoy = new Date();
  const en30dias = new Date();
  en30dias.setDate(hoy.getDate() + 30);

  const porVencer = medicamentos.filter((med) => {
    const vencimiento = new Date(med.fechaVencimiento);
    return vencimiento <= en30dias;
  });

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
      <div className="paneles">
        <div className="panel-alerta">
          <h3>Stock bajo</h3>
          {stockBajo.length === 0 ? (
            <p>No hay medicamentos con stock bajo.</p>
          ) : (
            <ul>
              {stockBajo.map((med) => (
                <li key={med.id}>
                  {med.nombre} — quedan {med.stock} unidades
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel-alerta">
          <h3>Próximos a vencer (30 días)</h3>
          {porVencer.length === 0 ? (
            <p>No hay medicamentos próximos a vencer.</p>
          ) : (
            <ul>
              {porVencer.map((med) => (
                <li key={med.id}>
                  {med.nombre} — vence el {med.fechaVencimiento}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
