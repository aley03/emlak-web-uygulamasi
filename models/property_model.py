from sqlalchemy import Column, Integer, String, Text
from database import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    city = Column(String, nullable=False)
    rooms = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(Text)
    image_url = Column(String, nullable=True)

