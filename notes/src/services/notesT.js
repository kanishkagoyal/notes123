import axios from 'axios';
const baseUrl = '/api/notesT';
let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const update = async newObject => {
  console.log(newObject);
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  );
  return response;
};

export default { setToken, getAll, update };
