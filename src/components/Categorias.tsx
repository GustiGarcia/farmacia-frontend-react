import { useEffect, useState } from "react";
import api from "../api";
import type { Categoria } from "../types";

function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Categoria[]>("/categoria")
      .then((res) => setCategorias(res.data))
      .catch(() => setError("No se pudieron cargar las categorías."))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className="estado">Cargando categorías...</p>;
  if (error) return <p className="estado error">{error}</p>;

  return (
    <section>
      <h2>Categorías</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.nombre}</td>
              <td>{cat.descripcion ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Categorias;
