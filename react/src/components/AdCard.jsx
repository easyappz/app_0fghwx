import React from 'react';
import { Link } from 'react-router-dom';

const AdCard = ({ ad }) => {
  return (
    <article
      data-easytag="id1-react/src/components/AdCard.jsx"
      className="rounded-2xl border border-line bg-card shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div data-easytag="id2-react/src/components/AdCard.jsx" className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200" aria-label="Пространство под изображение" />
      <div data-easytag="id3-react/src/components/AdCard.jsx" className="p-4">
        <h3 data-easytag="id4-react/src/components/AdCard.jsx" className="text-[15px] font-semibold line-clamp-2 mb-2">{ad.title}</h3>
        <p data-easytag="id5-react/src/components/AdCard.jsx" className="text-accent font-medium mb-3">{ad.price} ₽</p>
        <Link
          data-easytag="id6-react/src/components/AdCard.jsx"
          to={`/ads/${ad.id}`}
          className="inline-block text-sm text-accent hover:underline"
          aria-label={`Перейти к объявлению ${ad.title}`}
        >
          Открыть
        </Link>
      </div>
    </article>
  );
};

export default AdCard;
