from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal

class MedicoResponse(BaseModel):
    id: int
    nome: str
    descricao: Optional[str]
    imagem: Optional[str]
    avaliacao: Optional[Decimal]
    especialidades: str
    horarios: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class MedicosList(BaseModel):
    medicos: list[MedicoResponse]
    total: int
    especialidade: Optional[str] = None