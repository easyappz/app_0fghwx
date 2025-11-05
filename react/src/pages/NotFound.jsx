import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <section data-easytag="id1-react/src/pages/NotFound.jsx" className="">
      <div data-easytag="id2-react/src/pages/NotFound.jsx" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 data-easytag="id3-react/src/pages/NotFound.jsx" className="text-5xl font-semibold mb-4">404</h1>
        <p data-easytag="id4-react/src/pages/NotFound.jsx" className="text-muted mb-8">Страница не найдена</p>
        <Link data-easytag="id5-react/src/pages/NotFound.jsx" to="/">
          <Button data-easytag="id6-react/src/pages/NotFound.jsx">На главную</Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
