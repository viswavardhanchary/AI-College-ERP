import axios from 'axios';

export const api_node = axios.create({ // normal logic
  baseURL: 'http://localhost:3000'
});


export const api_python = axios.create({ // ai chats
  baseURL: 'http://localhost:5000'
});