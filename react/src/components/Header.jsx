import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header
      data-easytag="id1-react/src/components/Header.jsx"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 border-b border-line/60"
      aria-label="Главная панель навигации"
    >
      <div data-easytag="id2-react/src/components/Header.jsx" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-easytag="id3-react/src/components/Header.jsx" className="h-16 flex items-center justify-between">
          <Link
            data-easytag="id4-react/src/components/Header.jsx"
            to="/"
            className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
            aria-label="Логотип"
          >
            EasyBoard
          </Link>

          <nav data-easytag="id5-react/src/components/Header.jsx" className="flex items-center gap-6" aria-label="Навигация по сайту">
            <Link
              data-easytag="id6-react/src/components/Header.jsx"
              to="/"
              className={`text-sm hover:text-accent transition-colors ${location.pathname === '/' ? 'text-accent' : 'text-black'}`}
              aria-label="Ссылка на главную"
            >
              Главная
            </Link>
            <Link
              data-easytag="id7-react/src/components/Header.jsx"
              to="/ads"
              className={`text-sm hover:text-accent transition-colors ${location.pathname.startsWith('/ads') ? 'text-accent' : 'text-black'}`}
              aria-label="Ссылка на список объявлений"
            >
              Объявления
            </Link>
            <Link
              data-easytag="id8-react/src/components/Header.jsx"
              to="/ads/create"
              className="text-sm hover:text-accent transition-colors text-black"
              aria-label="Ссылка на создание объявления"
            >
              Создать
            </Link>

            {!token ? (
              <Link
                data-easytag="id9-react/src/components/Header.jsx"
                to="/login"
                className="text-sm hover:text-accent transition-colors text-black"
                aria-label="Ссылка на авторизацию"
              >
                Войти
              </Link>
            ) : (
              <>
                <Link
                  data-easytag="id10-react/src/components/Header.jsx"
                  to="/profile"
                  className="text-sm hover:text-accent transition-colors text-black"
                  aria-label="Ссылка на профиль"
                >
                  Профиль
                </Link>
                <button
                  data-easytag="id11-react/src/components/Header.jsx"
                  type="button"
                  onClick={onLogout}
                  className="text-sm text-muted hover:text-accent transition-colors"
                  aria-label="Кнопка выхода"
                >
                  Выйти
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
