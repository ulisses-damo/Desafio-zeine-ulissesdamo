import { useState } from 'react';
import { toast } from 'react-toastify';
import type { Medico } from '../types/medico';
import './DetalheMedico.css';

interface DetalheMedicoProps {
  medico: Medico;
  onBack: () => void;
}

export function DetalheMedico({ medico, onBack }: DetalheMedicoProps) {
  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [biografiaExpandida, setBiografiaExpandida] = useState<boolean>(false);

  const getEspecialidadesChips = (especialidades: string) => {
    return especialidades.split(',').map(esp => esp.trim());
  };

  const getHorarios = (horarios?: string) => {
    if (!horarios) return ['09:00 AM', '11:00 AM', '03:00 PM'];
    return horarios.split(',').map(h => h.trim());
  };

  const especialidadesArray = getEspecialidadesChips(medico.especialidades);
  const horariosArray = getHorarios(medico.horarios);

  const getDiasCalendario = () => {
    const hoje = new Date();
    const dias = [];
    
    for (let i = 0; i < 4; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      
      const dayNamePt = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      
      dias.push({
        id: i,
        numero: data.getDate(),
        nome: dayNamePt[data.getDay()],
        selecionado: diaSelecionado === i
      });
    }
    
    return dias;
  };

  const handleSelecionarDia = (diaId: number) => {
    if (diaSelecionado === diaId) {
      setDiaSelecionado(null); 
    } else {
      setDiaSelecionado(diaId); 
    }
  };

  const handleSelecionarHorario = (horario: string) => {
    if (horarioSelecionado === horario) {
      setHorarioSelecionado(null); 
    } else {
      setHorarioSelecionado(horario); 
    }
  };

  // Funções para manipular a biografia
  const limitarTexto = (texto: string, limite: number) => {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
  };

  const handleToggleBiografia = () => {
    setBiografiaExpandida(!biografiaExpandida);
  };

  const getBiografiaExibida = () => {
    const LIMITE_CARACTERES = 80; 
    if (biografiaExpandida) {
      return medico.descricao;
    }
    return limitarTexto(medico.descricao, LIMITE_CARACTERES);
  };

  const handleAgendarConsulta = () => {
    if (diaSelecionado !== null && horarioSelecionado !== null) {
      const diaInfo = diasCalendario.find(d => d.id === diaSelecionado);
      const dataFormatada = `${diaInfo?.numero}  ${diaInfo?.nome}  `;
      
      toast.success(
        <>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
               Consulta agendada com sucesso!
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
               <strong>Data:</strong> {dataFormatada}<br/>
              <strong>Horário:</strong> {horarioSelecionado}<br/>
              <strong>Médico:</strong> {medico.nome}
            </div>
          </div>
        </>,
        {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setDiaSelecionado(null);
      setHorarioSelecionado(null);
    }
  };

  const diasCalendario = getDiasCalendario();

  return (
    <div className="detalhe-medico">
      {/* Header */}
      <div className="detalhe-header">
        <img className="back-button" src="../../return.svg" onClick={onBack} />
            
        <h1>Informações do Médico</h1>
      </div>

      {/* Info do Médico */}
      <div className="medico-info">
        <div className="medico-avatar">
          <img src={medico.imagem} alt={medico.nome} />
        </div>
        <div className="medico-dados">
          <h2>{medico.nome}</h2>
          <p className="especialidade-principal">{especialidadesArray[0]}</p>
          <div className="avaliacao">
            <span className="star">⭐</span>
            <span>{medico.avaliacao}</span>
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="secao">
        <h3>Biografia</h3>
        <p className="biografia">
          {getBiografiaExibida()}
          {medico.descricao.length > 60 && (
            <span className="read-more" onClick={handleToggleBiografia}>
              {biografiaExpandida ? ' Ler menos' : ' Ler mais'}
            </span>
          )}
        </p>
      </div>

      {/* Specialities */}
      <div className="secao">
        <h3>Especialidades</h3>
        <div className="especialidades-chips">
          {especialidadesArray.map((esp, index) => (
            <span key={index} className="chip">{esp}</span>
          ))}        </div>
      </div>

      {/* Calendar */}
      <div className="secao">
        <div className="secao-header">
          <h3>Calendário</h3>
        </div>
        <div className="calendario-dias">
          {diasCalendario.map((dia, index) => (
            <div 
              key={index} 
              className={`dia-calendario ${dia.selecionado ? 'selecionado' : ''}`}
              onClick={() => handleSelecionarDia(dia.id)}
            >
              <span className="dia-numero">{dia.numero}</span>
              <span className="dia-nome">{dia.nome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time */}
      <div className="secao">
        <h3>Horários</h3>
        <div className="horarios-disponiveis">
          {horariosArray.map((horario, index) => (
            <button 
              key={index} 
              className={`horario-btn ${horarioSelecionado === horario ? 'selecionado' : ''}`}
              onClick={() => handleSelecionarHorario(horario)}
            >
              {horario}
            </button>
          ))}
        </div>
      </div>

      {/* Book Appointment Button */}
      <div className="book-appointment">
        {diaSelecionado !== null && horarioSelecionado !== null && (
          <div className="selecao-info">
            <p>Agendamento selecionado: {diasCalendario.find(d => d.id === diaSelecionado)?.nome} {diasCalendario.find(d => d.id === diaSelecionado)?.numero} às {horarioSelecionado}</p>
          </div>
        )}
        <button 
          className={`btn-agendar ${diaSelecionado !== null && horarioSelecionado !== null ? 'ativo' : 'inativo'}`}
          disabled={diaSelecionado === null || horarioSelecionado === null}
          onClick={handleAgendarConsulta}
        >
          Agendar Consulta
        </button>
      </div>
    </div>
  );
}