export type EstadoCivil = "Solteiro" | "Casado" | "Viúvo" | "Divorciado";

export interface Cliente {
  id: string;
  cpfCnpj: string;
  rg?: string;
  dataNascimento: Date;
  nome: string;
  nomeSocial?: string;
  email: string;
  endereco: string;
  rendaAnual: number;
  patrimonio: number;
  estadoCivil: EstadoCivil;
  codigoAgencia: number;
}

export default Cliente;