import { useEffect, useState } from "react";
import api from "../api";
import type { Empleado } from "../types";

function Empleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargo, setCargo] = useState("");
  const [dni, setDni] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");

  useEffect(() => {
    cargarEmpleados();
  }, []);

  function cargarEmpleados() {
    api
      .get<Empleado[]>("/empleado")
      .then((res) => setEmpleados(res.data))
      .catch(() => setError("No se pudieron cargar los empleados."))
      .finally(() => setCargando(false));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const nuevo = {
      nombre,
      apellido,
      email,
      telefono,
      cargo,
      dni,
      fechaIngreso,
    };

    api
      .post("/empleado", nuevo)
      .then(() => {
        setNombre("");
        setApellido("");
        setEmail("");
        setTelefono("");
        setCargo("");
        setDni("");
        setFechaIngreso("");
        cargarEmpleados();
      })
      .catch(() => setError("No se pudo guardar el empleado."));
  }

  function handleEliminar(id: number) {
    if (!confirm("¿Seguro que querés eliminar este empleado?")) return;

    api
      .delete(`/empleado/${id}`)
      .then(() => cargarEmpleados())
      .catch(() => setError("No se pudo eliminar el empleado."));
  }

  if (cargando) return <p className="estado">Cargando empleados...</p>;

  return (
    <section>
      <h2>Empleados</h2>
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
          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="cargo">Cargo</label>
          <input
            id="cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="dni">DNI</label>
          <input
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="fechaIngreso">Fecha de ingreso</label>
          <input
            id="fechaIngreso"
            type="date"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            required
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
            <th>Apellido</th>
            <th>Cargo</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha de ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.cargo}</td>
              <td>{emp.dni}</td>
              <td>{emp.email}</td>
              <td>{emp.telefono}</td>
              <td>{emp.fechaIngreso}</td>
              <td>
                <button
                  onClick={() => handleEliminar(emp.id)}
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

export default Empleados; 