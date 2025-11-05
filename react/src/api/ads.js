import instance from './axios';

export const list = async (params) => {
  const res = await instance.get('/api/ads/', { params });
  return res.data;
};

export const retrieve = async (id) => {
  const res = await instance.get(`/api/ads/${id}/`);
  return res.data;
};

export const create = async (formData) => {
  const res = await instance.post('/api/ads/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const update = async (id, formData) => {
  const res = await instance.patch(`/api/ads/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const remove = async (id) => {
  const res = await instance.delete(`/api/ads/${id}/`);
  return res.status;
};
