import { useEffect, useState } from "react";
import api from "../api";
import type { Medicamento } from "../types";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Medicamento[]>("/medicamento")
      .then((res) => setMedicamentos(res.data))
      .catch(() => setError("No se pudieron cargar los medicamentos."))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className="estado">Cargando medicamentos...</p>;
  if (error) return <p className="estado error">{error}</p>;

  return (
    <section>
      <h2>Medicamentos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Laboratorio</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.id}>
              <td>{med.nombre}</td>
              <td>{med.laboratorio}</td>
              <td>{med.categoria?.nombre}</td>
              <td>${Number(med.precio).toFixed(2)}</td>
              <td>{med.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Medicamentos;
