import React, { useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { retrieve as retrieveAd, remove as removeAd } from '../api/ads';
import { getMe } from '../api/auth';
import Button from '../components/ui/Button';

const AdView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adId = Number(id);

  const { data: ad, isLoading, isError } = useQuery({
    queryKey: ['ad', adId],
    queryFn: () => retrieveAd(adId),
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: Boolean(token),
  });

  const isOwner = useMemo(() => {
    if (!me || !ad) return false;
    const myAdIds = (me.ads || []).map((a) => a.id);
    return myAdIds.includes(adId);
  }, [me, ad, adId]);

  const { mutate: doDelete, isPending: deleting } = useMutation({
    mutationFn: () => removeAd(adId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      navigate('/ads');
    },
  });

  if (isLoading) return <p data-easytag="id1-react/src/pages/AdView.jsx" className="mx-auto max-w-6xl px-4 py-10 text-muted">Загрузка...</p>;
  if (isError || !ad) return <p data-easytag="id2-react/src/pages/AdView.jsx" className="mx-auto max-w-6xl px-4 py-10 text-red-500">Ошибка загрузки</p>;

  return (
    <section data-easytag="id3-react/src/pages/AdView.jsx" className="">
      <div data-easytag="id4-react/src/pages/AdView.jsx" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div data-easytag="id5-react/src/pages/AdView.jsx" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div data-easytag="id6-react/src/pages/AdView.jsx" className="lg:col-span-7 rounded-2xl border border-line bg-card shadow-soft overflow-hidden">
            <div data-easytag="id7-react/src/pages/AdView.jsx" className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200" aria-label="Пространство под изображение" />
          </div>
          <div data-easytag="id8-react/src/pages/AdView.jsx" className="lg:col-span-5">
            <h1 data-easytag="id9-react/src/pages/AdView.jsx" className="text-3xl font-semibold mb-2">{ad.title}</h1>
            <p data-easytag="id10-react/src/pages/AdView.jsx" className="text-xl text-accent font-medium mb-6">{ad.price} ₽</p>
            <p data-easytag="id11-react/src/pages/AdView.jsx" className="text-muted mb-6 whitespace-pre-line">{ad.description}</p>
            <div data-easytag="id12-react/src/pages/AdView.jsx" className="rounded-xl border border-line bg-card p-4">
              <p data-easytag="id13-react/src/pages/AdView.jsx" className="text-sm text-muted mb-1">Продавец</p>
              <p data-easytag="id14-react/src/pages/AdView.jsx" className="text-[15px]">{ad.owner?.name} ({ad.owner?.email})</p>
            </div>

            {isOwner && (
              <div data-easytag="id15-react/src/pages/AdView.jsx" className="flex items-center gap-3 mt-6">
                <Link data-easytag="id16-react/src/pages/AdView.jsx" to={`/ads/${adId}/edit`}>
                  <Button data-easytag="id17-react/src/pages/AdView.jsx" className="bg-white text-black border border-line hover:bg-gray-50">Редактировать</Button>
                </Link>
                <Button data-easytag="id18-react/src/pages/AdView.jsx" onClick={() => doDelete()} disabled={deleting} className="bg-red-500 hover:bg-red-600">
                  Удалить
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdView;
