import { useEffect } from "react";
import api from "./api";

function App() {
  useEffect(() => {
    api
      .get("/categoria")
      .then((res) => console.log("Categorías:", res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    api
      .get("/medicamento")
      .then((res) => console.log("medicamentos:", res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return <h1>Probando conexión</h1>;
}

export default App;
