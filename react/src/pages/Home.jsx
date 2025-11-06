import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <section data-easytag="id5-react/src/pages/Home.jsx" className="relative">
      <div data-easytag="id2-react/src/pages/Home.jsx" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div data-easytag="id3-react/src/pages/Home.jsx" className="text-center">
          <h1 data-easytag="id5-react/src/pages/Home.jsx" className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Прикольный сайт
          </h1>
          <p data-easytag="id5-react/src/pages/Home.jsx" className="text-lg text-muted mb-8">
            Это самый красивый сайт
          </p>
          <Link data-easytag="id6-react/src/pages/Home.jsx" to="/ads" aria-label="Перейти к объявлениям">
            <Button data-easytag="id7-react/src/pages/Home.jsx" className="px-6 py-3 text-base">Перейти к объявлениям</Button>
          </Link>
        </div>
      </div>
      <div data-easytag="id8-react/src/pages/Home.jsx" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-200/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default Home;
