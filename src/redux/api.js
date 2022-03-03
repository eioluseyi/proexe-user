export const createUser = async ({ req }) => {
  return fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
    {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const readUsers = async () => {
  return fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateUser = async ({ req }) => {
  const { id, ...data } = req;
  return fetch(
    `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const deleteUser = async (id) => {
  return fetch(
    `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
  )
    .then(() => ({ id }))
    .catch((err) => console.log(err));
};
