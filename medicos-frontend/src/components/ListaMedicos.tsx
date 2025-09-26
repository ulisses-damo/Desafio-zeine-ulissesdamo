import { useState, useEffect } from 'react';
import type { Medico } from '../types/medico';
import { MedicoService } from '../services/medicoService';
import { MedicoCard } from './MedicoCard';

interface ListaMedicosProps {
  onSelecionarMedico: (medico: Medico) => void;
}

export function ListaMedicos({ onSelecionarMedico }: ListaMedicosProps) {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [todosMedicos, setTodosMedicos] = useState<Medico[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<string>('');
  const [termoPesquisa, setTermoPesquisa] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    carregarMedicos();
  }, []);

  const carregarMedicos = async () => {
    try {
      setLoading(true);
      const medicosData = await MedicoService.getAllMedicos();
      setTodosMedicos(medicosData);
      setMedicos(medicosData);
    } catch {
      setError('Erro ao carregar médicos. Verifique se a API está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleEspecialidadeChange = async (especialidade: string) => {
    try {
      setLoading(true);
      
      if (especialidadeSelecionada === especialidade) {
        setEspecialidadeSelecionada('');
        const medicosData = await MedicoService.getAllMedicos();
        setTodosMedicos(medicosData);
        aplicarFiltros(medicosData, termoPesquisa);
      } else {
        setEspecialidadeSelecionada(especialidade);
        const medicosData = await MedicoService.getMedicosByEspecialidade(especialidade);
        setTodosMedicos(medicosData);
        aplicarFiltros(medicosData, termoPesquisa);
      }
    } catch {
      setError('Erro ao filtrar médicos.');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = (listaMedicos: Medico[], pesquisa: string) => {
    let medicosFiltrados = listaMedicos;

    if (pesquisa.trim()) {
      medicosFiltrados = medicosFiltrados.filter(medico =>
        medico.nome.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }

    setMedicos(medicosFiltrados);
  };

  const handlePesquisaChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const novoTermo = evento.target.value;
    setTermoPesquisa(novoTermo);
    
    let listaBase = todosMedicos;
    if (especialidadeSelecionada) {
      listaBase = todosMedicos.filter(medico => 
        medico.especialidades.includes(especialidadeSelecionada)
      );
    }
    
    aplicarFiltros(listaBase, novoTermo);
  };

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div className="lista-medicos">
      {/* Header */}
      <header className="header">
        <div className="greeting">Olá, Ulisses</div>
        <h1 className="main-title">Vamos encontrar<br />seu médico aqui!</h1>
      </header>

      {/* Barra de Pesquisa */}
      <div className="search-container">
        <div className="search-box">
          <img className="search-icon" src="../../Search.svg"></img>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Pesquise aqui..."
            value={termoPesquisa}
            onChange={handlePesquisaChange}
          />
        </div>
      </div>

      {/* Seção de Categorias */}
      <div className="categories-section">
        <h2 className="categories-title">Categorias</h2>
        <div className="categories-grid">
          <div
            // className={`flex flex-col items-center p-[10px] rounded-full  shadow-md ${especialidadeSelecionada === 'Cardiologia' ? 'bg-[#4A90E2] font-bold' : ''}`}
            className={`category-item ${especialidadeSelecionada === 'Cardiologia' ? 'active' : ''}`}
            onClick={() => handleEspecialidadeChange('Cardiologia')}
          >
            <div className="category-icon">❤️</div>
          </div>
          <div
            className={`category-item ${especialidadeSelecionada === 'Odontologia' ? 'active' : ''}`}
            onClick={() => handleEspecialidadeChange('Odontologia')}
          >
            <div className="category-icon">🦷</div>
          </div>
          <div
            className={`category-item ${especialidadeSelecionada === 'Ortopedia' ? 'active' : ''}`}
            onClick={() => handleEspecialidadeChange('Ortopedia')}
          >
            <div className="category-icon">🦴</div>
          </div>
          <div
            className={`category-item ${especialidadeSelecionada === 'Neurologia' ? 'active' : ''}`}
            onClick={() => handleEspecialidadeChange('Neurologia')}
          >
            <div className="category-icon">🧠</div>
          </div>
        </div>
      </div>

      {/* Lista de Médicos */}
      <div className="medicos-section">
        {loading ? (
          <div className="loading">
            <p>Carregando médicos...</p>
          </div>
        ) : (
          <div className="medicos-grid">
            {medicos && medicos.length > 0 ? (
              medicos.map((medico) => (
                <MedicoCard key={medico.id} medico={medico} onClick={onSelecionarMedico} />
              ))
            ) : (
              <p className="no-results">Nenhum médico encontrado para esta especialidade.</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <img className="nav-item active" src="../../Home.svg"></img>
        <img className="nav-item" src="../../Calendar.svg"></img>
        <img className="nav-item" src="../../Chat.svg"></img>
        <img className="nav-item" src="../../User.svg"></img>
      </div>
    </div>
  );
}