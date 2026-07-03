from fastapi import FastAPI

from database import Base, engine
from routes.property_routes import router as property_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Emlak API",
    description="Admin ilan ekleyebildiği basit emlak backend servisi",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(property_router)#“FastAPI, property_routes.py içindeki bütün endpoint’leri aktif et 
#/properties

#/properties/{id}

#POST / PUT / PATCH / DELETE

#hepsi resmen sisteme bağlanıyor
@app.get("/")
def root():
    return {"message": "Emlak API çalışıyor"}

Base.metadata.create_all(bind=engine)


