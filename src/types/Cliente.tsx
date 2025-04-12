interface Cliente {
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
    estadoCivil: "Solteiro" | "Casado" | "Viúvo" | "Divorciado";
    codigoAgencia: number;
  }
  
  export type ClienteType = Cliente; 
  
  export default Cliente;