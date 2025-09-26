from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional, List

from database import get_db, engine
from models import Base
from schemas import MedicoResponse, MedicosList
from repository import get_all_medicos, get_medicos_by_especialidade, get_especialidades_disponiveis

# Criar as tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Médicos API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API de Médicos funcionando!"}

@app.get("/medicos", response_model=MedicosList)
def listar_medicos(especialidade: Optional[str] = None, db: Session = Depends(get_db)):
    if especialidade:
        medicos = get_medicos_by_especialidade(db, especialidade)
    else:
        medicos = get_all_medicos(db)
    
    return MedicosList(
        medicos=medicos,
        total=len(medicos),
        especialidade=especialidade
    )

@app.get("/especialidades", response_model=List[str])
def listar_especialidades(db: Session = Depends(get_db)):
    return get_especialidades_disponiveis(db)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)