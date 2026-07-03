import { useEffect, useState } from "react";
import {
  getProperties,
  createProperty,
  deleteProperty,
} from "../api/propertyApi";
import { Link } from "react-router-dom";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    getProperties()
      .then(setProperties)
      .finally(() => setLoading(false));
  }, []);

  
  const handleAdd = async (e) => {
    e.preventDefault();

    const newProperty = {
      title,
      city,
      rooms: Number(rooms),
      price: Number(price),
      description,
      image_url: imageUrl,
    };

    const created = await createProperty(newProperty);
    setProperties((prev) => [created, ...prev]);

    setTitle("");
    setCity("");
    setRooms("");
    setPrice("");
    setDescription("");
    setImageUrl("");
  };

  
  const handleDelete = async (id) => {
    await deleteProperty(id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleFavorite = (id) => {
    let updatedFavorites;

    if (favorites.includes(id)) { 
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) return <p className="loading">Yükleniyor...</p>;

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Emlak İlanları</h1>

        
        <div className="form-box">
          <h2>Yeni İlan Ekle</h2>

          <form onSubmit={handleAdd}>
            <input
              placeholder="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              placeholder="Şehir"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              placeholder="Oda Sayısı"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              required
            />

            <input
              placeholder="Fiyat"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              placeholder="Resim URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <textarea
              placeholder="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />

            <button type="submit">İlan Ekle</button>
          </form>
        </div>

        
        <div className="property-grid">
          {properties.map((p) => (
            <Link
              key={p.id}
              to={`/properties/${p.id}`}
              className="property-link"
            >
              <div className="property-card">
                {p.image_url && <img src={p.image_url} alt={p.title} />}

                <div className="property-body">
                  <h3>{p.title}</h3>
                  <p>{p.city}</p>
                  <p>{p.rooms} oda</p>
                  <p>{p.price} ₺</p>

                  {p.description && (
                    <p className="desc">{p.description}</p>
                  )}

                  
                  <button
                    className="fav-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(p.id);
                    }}
                  >
                    {favorites.includes(p.id) ? "❤️" : "🤍"}
                  </button>

                
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(p.id);
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyList;
