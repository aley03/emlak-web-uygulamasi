const BASE_URL = "http://127.0.0.1:8000";

export const getProperties = async () => {
  const res = await fetch(`${BASE_URL}/properties`);
  return res.json();
};

export const getPropertyById = async (id) => {
  const res = await fetch(`${BASE_URL}/properties/${id}`);
  return res.json();
};

export const createProperty = async (data) => {
  const res = await fetch(`${BASE_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProperty = async (id, data) => {
  const res = await fetch(`${BASE_URL}/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProperty = async (id) => {
  await fetch(`${BASE_URL}/properties/${id}`, {
    method: "DELETE",
  });
};
