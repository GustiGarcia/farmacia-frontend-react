export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Medicamento {
  id: number;
  nombre: string;
  laboratorio: string;
  precio: string;
  stock: number;
  categoria: Categoria;
}

export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  cargo: string;
  dni: string;
}
