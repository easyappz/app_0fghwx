import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { create as createAd } from '../api/ads';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AdCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => createAd(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      if (data?.id) navigate(`/ads/${data.id}`);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price) return;
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('price', price);
    if (image) fd.append('image', image);
    mutate(fd);
  };

  return (
    <section data-easytag="id1-react/src/pages/AdCreate.jsx" className="">
      <div data-easytag="id2-react/src/pages/AdCreate.jsx" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 data-easytag="id3-react/src/pages/AdCreate.jsx" className="text-2xl font-semibold mb-6">Создать объявление</h2>
        <form data-easytag="id4-react/src/pages/AdCreate.jsx" onSubmit={onSubmit} className="rounded-2xl border border-line bg-card p-6 shadow-soft space-y-5">
          <Input label="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например: iPhone 13" aria-label="Заголовок объявления" />
          <div data-easytag="id5-react/src/pages/AdCreate.jsx">
            <label data-easytag="id6-react/src/pages/AdCreate.jsx" className="block mb-1 text-sm text-muted">Описание</label>
            <textarea
              data-easytag="id7-react/src/pages/AdCreate.jsx"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent transition min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Состояние, комплектация и пр."
              aria-label="Описание объявления"
            />
          </div>
          <Input label="Цена (₽)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" aria-label="Цена" />
          <div data-easytag="id8-react/src/pages/AdCreate.jsx">
            <label data-easytag="id9-react/src/pages/AdCreate.jsx" className="block mb-1 text-sm text-muted">Изображение (необязательно)</label>
            <input data-easytag="id10-react/src/pages/AdCreate.jsx" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} aria-label="Загрузка изображения" />
          </div>
          <div data-easytag="id11-react/src/pages/AdCreate.jsx" className="flex gap-3">
            <Button data-easytag="id12-react/src/pages/AdCreate.jsx" type="submit" disabled={isPending}>Создать</Button>
            <Button data-easytag="id13-react/src/pages/AdCreate.jsx" type="button" className="bg-white text-black border border-line hover:bg-gray-50" onClick={() => navigate(-1)}>Отмена</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdCreate;
