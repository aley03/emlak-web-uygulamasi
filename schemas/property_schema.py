from pydantic import BaseModel
from typing import Optional

class PropertyCreate(BaseModel):
    title: str
    city: str
    rooms: int
    price: int
    description: Optional[str] = None
    image_url: Optional[str] = None


class PropertyResponse(PropertyCreate):
    id: int

    
class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    city: Optional[str] = None
    rooms: Optional[int] = None
    price: Optional[int] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    
    
class Config:
        orm_mode = True
        
