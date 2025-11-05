import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { retrieve as retrieveAd, update as updateAd } from '../api/ads';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AdEdit = () => {
  const { id } = useParams();
  const adId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: ad } = useQuery({ queryKey: ['ad', adId], queryFn: () => retrieveAd(adId) });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (ad) {
      setTitle(ad.title || '');
      setDescription(ad.description || '');
      setPrice(ad.price || '');
    }
  }, [ad]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => updateAd(adId, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ad', adId] });
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      navigate(`/ads/${adId}`);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (title) fd.append('title', title);
    if (description) fd.append('description', description);
    if (price !== '') fd.append('price', price);
    if (image) fd.append('image', image);
    mutate(fd);
  };

  return (
    <section data-easytag="id1-react/src/pages/AdEdit.jsx" className="">
      <div data-easytag="id2-react/src/pages/AdEdit.jsx" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 data-easytag="id3-react/src/pages/AdEdit.jsx" className="text-2xl font-semibold mb-6">Редактировать объявление</h2>
        <form data-easytag="id4-react/src/pages/AdEdit.jsx" onSubmit={onSubmit} className="rounded-2xl border border-line bg-card p-6 shadow-soft space-y-5">
          <Input label="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Заголовок объявления" />
          <div data-easytag="id5-react/src/pages/AdEdit.jsx">
            <label data-easytag="id6-react/src/pages/AdEdit.jsx" className="block mb-1 text-sm text-muted">Описание</label>
            <textarea
              data-easytag="id7-react/src/pages/AdEdit.jsx"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent transition min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Описание объявления"
            />
          </div>
          <Input label="Цена (₽)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Цена" />
          <div data-easytag="id8-react/src/pages/AdEdit.jsx">
            <label data-easytag="id9-react/src/pages/AdEdit.jsx" className="block mb-1 text-sm text-muted">Изображение (замена)</label>
            <input data-easytag="id10-react/src/pages/AdEdit.jsx" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} aria-label="Загрузка изображения" />
          </div>
          <div data-easytag="id11-react/src/pages/AdEdit.jsx" className="flex gap-3">
            <Button data-easytag="id12-react/src/pages/AdEdit.jsx" type="submit" disabled={isPending}>Сохранить</Button>
            <Button data-easytag="id13-react/src/pages/AdEdit.jsx" type="button" className="bg-white text-black border border-line hover:bg-gray-50" onClick={() => navigate(-1)}>Отмена</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdEdit;
