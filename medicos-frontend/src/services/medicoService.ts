import type { Medico } from '../types/medico';

const API_BASE_URL = 'http://localhost:8000';

export class MedicoService {
  static async getAllMedicos(): Promise<Medico[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/medicos`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar médicos: ${response.status}`);
      }
      const data = await response.json();
      return data.medicos;
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      throw error;
    }
  }

  static async getMedicosByEspecialidade(especialidade: string): Promise<Medico[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/medicos?especialidade=${encodeURIComponent(especialidade)}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar médicos por especialidade: ${response.status}`);
      }
      const data = await response.json();
      return data.medicos;
    } catch (error) {
      console.error('Erro ao buscar médicos por especialidade:', error);
      throw error;
    }
  }

  static async getEspecialidades(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/especialidades`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar especialidades: ${response.status}`);
      }
      const data = await response.json();
      return data.especialidades;
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw error;
    }
  }
}