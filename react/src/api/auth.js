import instance from './axios';

export const register = async (data) => {
  const res = await instance.post('/api/auth/register/', data);
  return res.data;
};

export const login = async (data) => {
  const res = await instance.post('/api/auth/login/', data);
  return res.data;
};

export const refresh = async (refreshToken) => {
  const res = await instance.post('/api/auth/refresh/', { refresh: refreshToken });
  return res.data;
};

export const getMe = async () => {
  const res = await instance.get('/api/auth/me/');
  return res.data;
};

export const updateMe = async (payload) => {
  if (payload instanceof FormData) {
    const res = await instance.patch('/api/auth/me/', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }
  const res = await instance.patch('/api/auth/me/', payload);
  return res.data;
};
