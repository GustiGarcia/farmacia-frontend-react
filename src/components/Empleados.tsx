import { useEffect, useState } from "react";
import api from "../api";
import type { Empleado } from "../types";

function Empleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Empleado[]>("/empleado")
      .then((res) => setEmpleados(res.data))
      .catch(() => setError("No se pudieron cargar los empleados."))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className="estado">Cargando empleados...</p>;
  if (error) return <p className="estado error">{error}</p>;

  return (
    <section>
      <h2>Empleados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo</th>
            <th>DNI</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.cargo}</td>
              <td>{emp.dni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Empleados;
