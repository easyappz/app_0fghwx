import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { list as listAds } from '../api/ads';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import AdCard from '../components/AdCard';

const AdsList = () => {
  const [q, setQ] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ordering, setOrdering] = useState('-created_at');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ads', { q, minPrice, maxPrice, ordering, page, pageSize }],
    queryFn: () =>
      listAds({
        q: q || undefined,
        min_price: minPrice || undefined,
        max_price: maxPrice || undefined,
        ordering: ordering || undefined,
        page: page,
        page_size: pageSize,
      }),
    keepPreviousData: true,
  });

  const totalPages = useMemo(() => {
    if (!data?.count) return 1;
    return Math.max(1, Math.ceil(data.count / pageSize));
  }, [data, pageSize]);

  const onApply = () => {
    setPage(1);
  };

  return (
    <section data-easytag="id1-react/src/pages/AdsList.jsx" className="">
      <div data-easytag="id2-react/src/pages/AdsList.jsx" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 data-easytag="id3-react/src/pages/AdsList.jsx" className="text-2xl font-semibold mb-6">Объявления</h2>
        <div data-easytag="id4-react/src/pages/AdsList.jsx" className="rounded-2xl border border-line bg-card p-4 sm:p-6 shadow-soft mb-8">
          <div data-easytag="id5-react/src/pages/AdsList.jsx" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div data-easytag="id6-react/src/pages/AdsList.jsx" className="lg:col-span-2">
              <Input
                label="Поиск"
                placeholder="Что ищем?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Поле поиска"
              />
            </div>
            <Input
              label="Мин. цена"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              aria-label="Минимальная цена"
            />
            <Input
              label="Макс. цена"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              aria-label="Максимальная цена"
            />
            <Select
              label="Сортировка"
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              options={[
                { label: 'Сначала новые', value: '-created_at' },
                { label: 'Сначала старые', value: 'created_at' },
                { label: 'Цена по возрастанию', value: 'price' },
                { label: 'Цена по убыванию', value: '-price' },
              ]}
              aria-label="Выбор сортировки"
            />
            <Select
              label="На странице"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              options={[
                { label: '12', value: 12 },
                { label: '24', value: 24 },
                { label: '36', value: 36 },
              ]}
              aria-label="Размер страницы"
            />
          </div>
          <div data-easytag="id7-react/src/pages/AdsList.jsx" className="mt-4">
            <Button data-easytag="id8-react/src/pages/AdsList.jsx" onClick={onApply}>Применить</Button>
          </div>
        </div>

        {isLoading && (
          <p data-easytag="id9-react/src/pages/AdsList.jsx" className="text-muted">Загрузка...</p>
        )}
        {isError && (
          <p data-easytag="id10-react/src/pages/AdsList.jsx" className="text-red-500">Ошибка загрузки объявлений</p>
        )}

        <div data-easytag="id11-react/src/pages/AdsList.jsx" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.results?.map((ad) => (
            <div data-easytag={`id12-${ad.id}-react/src/pages/AdsList.jsx`} key={ad.id}>
              <AdCard ad={ad} />
            </div>
          ))}
        </div>

        <div data-easytag="id13-react/src/pages/AdsList.jsx" className="flex items-center justify-between mt-8">
          <Button
            data-easytag="id14-react/src/pages/AdsList.jsx"
            className="bg-white text-black border border-line hover:bg-gray-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Назад
          </Button>
          <p data-easytag="id15-react/src/pages/AdsList.jsx" className="text-sm text-muted">
            Страница {page} из {totalPages}
          </p>
          <Button
            data-easytag="id16-react/src/pages/AdsList.jsx"
            className="bg-white text-black border border-line hover:bg-gray-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Вперед
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdsList;
