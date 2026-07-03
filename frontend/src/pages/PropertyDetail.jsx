import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../api/propertyApi";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    getPropertyById(id).then((data) => {
      setTitle(data.title);
      setCity(data.city);
      setRooms(data.rooms);
      setPrice(data.price);
      setDescription(data.description);
      setImageUrl(data.image_url); 
      setLoading(false);
    });
  }, [id]);

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateProperty(id, {
      title,
      city,
      rooms: Number(rooms),
      price: Number(price),
      description,
      image_url: imageUrl, 
    });

    alert("Güncellendi");
  };


  const handleDelete = async () => {
    await deleteProperty(id);
    navigate("/");
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h1>İlan Düzenle</h1>

      
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 20,
          }}
        />
      )}

    
      <form onSubmit={handleUpdate}>
        <input
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Şehir"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          placeholder="Oda"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />

        <input
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
        />

        <button type="submit">Güncelle</button>
      </form>

      <hr />

      <button
        onClick={handleDelete}
        style={{
          background: "red",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: 6,
          marginTop: 10,
        }}
      >
        Sil
      </button>
    </div>
  );
}

export default PropertyDetail;
