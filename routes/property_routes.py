from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from database import SessionLocal
from schemas.property_schema import (
    PropertyCreate,
    PropertyResponse,
    PropertyUpdate
)
from services.property_service import (
    create_property,
    get_all_properties,
    get_property_by_id,
    update_property,
    delete_property,
    patch_property
)

router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[PropertyResponse])
def list_properties(
    city: Optional[str] = None,
    min_price: Optional[int] = None,
    db: Session = Depends(get_db)
):
    return get_all_properties(db, city, min_price)



@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(property_id: int, db: Session = Depends(get_db)):
    prop = get_property_by_id(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="İlan bulunamadı")
    return prop


@router.post("/", response_model=PropertyResponse)
def create_property_endpoint(
    data: PropertyCreate,
    db: Session = Depends(get_db)
):
    return create_property(db, data)


@router.put("/{property_id}", response_model=PropertyResponse)
def update_property_endpoint(
    property_id: int,
    data: PropertyCreate,
    db: Session = Depends(get_db)
):
    updated = update_property(db, property_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="İlan bulunamadı")
    return updated


@router.patch("/{property_id}", response_model=PropertyResponse)
def patch_property_endpoint(
    property_id: int,
    data: PropertyUpdate,
    db: Session = Depends(get_db)
):
    updated = patch_property(db, property_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="İlan bulunamadı")
    return updated


@router.delete("/{property_id}")
def delete_property_endpoint(
    property_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_property(db, property_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="İlan bulunamadı")
    return {"message": "İlan silindi"}
