import { useEffect, useState } from "react";
import api from "../api";
import type { Categoria } from "../types";

function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  function cargarCategorias() {
    api
      .get<Categoria[]>("/categoria")
      .then((res) => setCategorias(res.data))
      .catch(() => setError("No se pudieron cargar las categorías."))
      .finally(() => setCargando(false));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const nueva = { nombre, descripcion };

    const peticion = editandoId
      ? api.patch(`/categoria/${editandoId}`, nueva)
      : api.post("/categoria", nueva);

    peticion
      .then(() => {
        setNombre("");
        setDescripcion("");
        cargarCategorias();
      })
      .catch(() => setError("No se pudo guardar la categoría."));
  }

  function handleEliminar(id: number) {
    if (!confirm("¿Seguro que querés eliminar esta categoría?")) return;

    api
      .delete(`/categoria/${id}`)
      .then(() => cargarCategorias())
      .catch(() => setError("No se pudo eliminar la categoría."));
  }

  function handleEditar(cat: Categoria) {
    setNombre(cat.nombre);
    setDescripcion(cat.descripcion);
    setEditandoId(cat.id);
  }

  if (cargando) return <p className="estado">Cargando categorías...</p>;

  return (
    <section>
      <h2>Categorías</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="descripcion">Descripción</label>
          <input
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <button type="submit" className="guardar">
          Guardar
        </button>
      </form>

      {error && <p className="estado error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.nombre}</td>
              <td>{cat.descripcion ?? "-"}</td>
              <td>
                <button onClick={() => handleEditar(cat)} className="editar">
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(cat.id)}
                  className="eliminar"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Categorias;
