interface FiltroEspecialidadesProps {
  especialidades: string[];
  especialidadeSelecionada: string;
  onEspecialidadeChange: (especialidade: string) => void;
}

export function FiltroEspecialidades({ 
  especialidades, 
  especialidadeSelecionada, 
  onEspecialidadeChange 
}: FiltroEspecialidadesProps) {
  return (
    <div className="filtro-especialidades">
      <h3>Filtrar por Especialidade</h3>
      <div className="especialidades-buttons">
        <button
          className={especialidadeSelecionada === '' ? 'ativo' : ''}
          onClick={() => onEspecialidadeChange('')}
        >
          Todas
        </button>
        {especialidades.map((especialidade) => (
          <button
            key={especialidade}
            className={especialidadeSelecionada === especialidade ? 'ativo' : ''}
            onClick={() => onEspecialidadeChange(especialidade)}
          >
            {especialidade}
          </button>
        ))}
      </div>
    </div>
  );
}