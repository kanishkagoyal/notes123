import axios from 'axios';
const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getIt = () => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.get(`${baseUrl}`, config);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const remove = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
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

export default { setToken, getIt, remove, create, update };
