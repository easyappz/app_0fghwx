import React from 'react';

function Footer() {
  return (
    <footer
      data-easytag="id1-react/src/components/Footer.jsx"
      className="border-t border-line/60 bg-white/80"
      aria-label="Нижний колонтитул"
    >
      <div data-easytag="id2-react/src/components/Footer.jsx" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-muted">
        <p data-easytag="id3-react/src/components/Footer.jsx">© {new Date().getFullYear()} EasyBoard. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
