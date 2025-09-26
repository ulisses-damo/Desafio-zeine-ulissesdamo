import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App-mobile.css'
import { ListaMedicos } from './components/ListaMedicos'
import { DetalheMedico } from './components/DetalheMedico'
import type { Medico } from './types/medico';

function App() {
  const [medicoSelecionado, setMedicoSelecionado] = useState<Medico | null>(null);

  const handleSelecionarMedico = (medico: Medico) => {
    setMedicoSelecionado(medico);
  };

  const handleVoltarLista = () => {
    setMedicoSelecionado(null);
  };

  return (
    <div className="app">
      {medicoSelecionado ? (
        <DetalheMedico 
          medico={medicoSelecionado} 
          onBack={handleVoltarLista} 
        />
      ) : (
        <ListaMedicos onSelecionarMedico={handleSelecionarMedico} />
      )}
      <ToastContainer />
    </div>
  )
}

export default App
