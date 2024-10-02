export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Opcional, no se debe enviar en el front-end para listar usuarios
  roleId: number;
  role?: Role; // Si necesitas la información del rol
}

export interface Role {
  id: number;
  name: string;
}
