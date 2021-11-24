import axios from 'axios';

const url = 'http://localhost:23493/'

export default axios.create({
  baseURL: url,
  headers: {
    accept: 'application/json'
  }
});

export { url }
