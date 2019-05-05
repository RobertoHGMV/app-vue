import axios from 'axios';

//utilizando projeto - api-node
const api = axios.create({ baseURL: 'http://localhost:3001/api/' });

export default api;