import { useEffect, useState } from "react";
import api from "../api";
import type { Categoria, Medicamento } from "../types";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    cargarMedicamentos();
    api
      .get<Categoria[]>("/categoria")
      .then((res) => setCategorias(res.data))
      .catch(() => setError("No se pudieron cargar las categorías."));
  }, []);

  function cargarMedicamentos() {
    api
      .get<Medicamento[]>("/medicamento")
      .then((res) => setMedicamentos(res.data))
      .catch(() => setError("No se pudieron cargar los medicamentos."))
      .finally(() => setCargando(false));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const nuevo = {
      nombre,
      laboratorio,
      precio: Number(precio),
      stock: Number(stock),
      categoria: { id: Number(categoriaId) },
    };

    api
      .post("/medicamento", nuevo)
      .then(() => {
        setNombre("");
        setLaboratorio("");
        setPrecio("");
        setStock("");
        setCategoriaId("");
        cargarMedicamentos();
      })
      .catch(() => setError("No se pudo guardar el medicamento."));
  }

  if (cargando) return <p className="estado">Cargando medicamentos...</p>;

  return (
    <section>
      <h2>Medicamentos</h2>

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
          <label htmlFor="laboratorio">Laboratorio</label>
          <input
            id="laboratorio"
            value={laboratorio}
            onChange={(e) => setLaboratorio(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="precio">Precio</label>
          <input
            id="precio"
            type="number"
            min="0.01"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Elegir...</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
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
