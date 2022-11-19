import Axios from 'axios';

export default Axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: 'fe9b7d20faa2',
  },
});