import axios from 'axios';
const baseUrl = '/api/loginT';

const loginT = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { loginT };
