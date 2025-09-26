from sqlalchemy import Column, Integer, String, DateTime, Text, DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Medico(Base):
    __tablename__ = "medicos"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False, index=True)
    descricao = Column(Text)
    imagem = Column(String(500))  # URL ou caminho para a imagem
    avaliacao = Column(DECIMAL(3, 2))  # Avaliação de 0.00 a 5.00
    especialidades = Column(String(100), nullable=False, index=True)
    horarios = Column(String(200))  # Horários disponíveis separados por vírgula
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f"<Medico(id={self.id}, nome='{self.nome}', especialidades='{self.especialidades}')>"