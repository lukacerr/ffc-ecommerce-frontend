export enum TipoDeUsuario {
  A,
  B,
}

export default interface User {
  id: number;
  tipo: TipoDeUsuario;
  token: string;
}
