from sqlalchemy.orm import Session
from models import Medico
from typing import Optional, List

def get_all_medicos(db: Session) -> List[Medico]:
    """Busca todos os médicos"""
    return db.query(Medico).order_by(Medico.avaliacao.desc(), Medico.nome).all()

def get_medicos_by_especialidade(db: Session, especialidade: str) -> List[Medico]:
    """Busca médicos por especialidade"""
    return db.query(Medico).filter(
        Medico.especialidades.ilike(f"%{especialidade}%")
    ).order_by(Medico.avaliacao.desc(), Medico.nome).all()

def get_especialidades_disponiveis(db: Session) -> List[str]:
    """Retorna lista de especialidades únicas"""
    especialidades = db.query(Medico.especialidades).distinct().all()
    return [esp[0] for esp in especialidades if esp[0]]