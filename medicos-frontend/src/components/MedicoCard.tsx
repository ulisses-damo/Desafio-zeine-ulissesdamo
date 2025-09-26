import type { Medico } from '../types/medico';

interface MedicoCardProps {
  medico: Medico;
  onClick?: (medico: Medico) => void;
}

export function MedicoCard({ medico, onClick }: MedicoCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(medico);
    }
  };

  return (
    <div className="medico-card" onClick={handleClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="medico-image">
        <img src={medico.imagem} alt={medico.nome} />
      </div>
      <div className="medico-info">
        <div className="medico-header">
          <h3 className="medico-nome">{medico.nome}</h3>
          <p className="medico-especialidades">{medico.especialidades}</p>
        <div className="medico-avaliacao">
          <span className="star-icon">★</span>
          <span className="rating-number">{medico.avaliacao}</span>
        </div>
        </div>
      </div>
    </div>
  );
}