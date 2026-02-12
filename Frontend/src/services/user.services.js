import {api_node} from './api.js';

export async function getUserData() {
  try {
    const res = await api_node.get('/user/4567');
    return {
      status: true,
      data: res.data
    }
  }catch(e) {
    return {
      status: false,
      data: null,
      message: e.res.data.message
    }
  }
}