import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => loginApi(payload),
    onSuccess: (data) => {
      if (data?.access) {
        localStorage.setItem('token', data.access);
      }
      const from = location.state?.from || '/profile';
      navigate(from);
    },
    onError: (e) => {
      setError(e?.response?.data?.detail || 'Ошибка авторизации');
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    mutate({ email, password });
  };

  return (
    <section data-easytag="id1-react/src/pages/Login.jsx">
      <div data-easytag="id2-react/src/pages/Login.jsx" className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-10">
        <h2 data-easytag="id3-react/src/pages/Login.jsx" className="text-2xl font-semibold mb-6">Вход</h2>
        <form data-easytag="id4-react/src/pages/Login.jsx" onSubmit={onSubmit} className="rounded-2xl border border-line bg-card p-6 shadow-soft space-y-5">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          <Input label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Пароль" />
          {error && <p data-easytag="id5-react/src/pages/Login.jsx" className="text-sm text-red-500">{error}</p>}
          <Button data-easytag="id6-react/src/pages/Login.jsx" type="submit" disabled={isPending}>Войти</Button>
          <p data-easytag="id7-react/src/pages/Login.jsx" className="text-sm text-muted">
            Нет аккаунта?{' '}
            <Link data-easytag="id8-react/src/pages/Login.jsx" to="/register" className="text-accent hover:underline">Зарегистрироваться</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
