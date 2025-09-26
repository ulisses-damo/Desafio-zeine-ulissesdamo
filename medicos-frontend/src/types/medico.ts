export interface Medico {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  avaliacao: number;
  especialidades: string;
  horarios?: string;
  created_at: string;
}

export interface MedicosList {
  medicos: Medico[];
}

export type Especialidade = 'Cardiologia' | 'Odontologia' | 'Ortopedia' | 'Neurologia';