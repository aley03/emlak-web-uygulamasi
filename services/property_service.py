from sqlalchemy.orm import Session
from models.property_model import Property
from schemas.property_schema import PropertyCreate
from schemas.property_schema import PropertyUpdate
from typing import Optional

def create_property(db: Session, data: PropertyCreate):
    new_property = Property(
        title=data.title,
        city=data.city,
        rooms=data.rooms,
        price=data.price,
        description=data.description,
        image_url=data.image_url
    )
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    return new_property


def get_all_properties(
    db: Session,
    city: Optional[str] = None,
    min_price: Optional[int] = None
):
    query = db.query(Property)

    if city is not None:
        query = query.filter(Property.city == city)

    if min_price is not None:
        query = query.filter(Property.price >= min_price)

    return query.all()


def get_property_by_id(db: Session, property_id: int):
    return db.query(Property).filter(Property.id == property_id).first()


def update_property(db: Session, property_id: int, data: PropertyCreate):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        return None

    prop.title = data.title
    prop.city = data.city
    prop.rooms = data.rooms
    prop.price = data.price
    prop.description = data.description
    prop.image_url = data.image_url

    db.commit()
    db.refresh(prop)
    return prop


def delete_property(db: Session, property_id: int):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        return None

    db.delete(prop)
    db.commit()
    return prop
def patch_property(db: Session, property_id: int, data: PropertyUpdate):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        return None

    if data.title is not None:
        prop.title = data.title
    if data.city is not None:
        prop.city = data.city 
    if data.rooms is not None:
        prop.rooms = data.rooms
    if data.price is not None:
        prop.price = data.price
    if data.description is not None:
        prop.description = data.description
    if data.image_url is not None:
        prop.image_url = data.image_url

    db.commit()
    db.refresh(prop)
    return prop
