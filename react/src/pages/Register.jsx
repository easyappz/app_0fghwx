import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register as registerApi } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => registerApi(payload),
    onSuccess: (data) => {
      if (data?.access) {
        localStorage.setItem('token', data.access);
      }
      navigate('/profile');
    },
    onError: (e) => {
      setError(e?.response?.data?.detail || 'Ошибка регистрации');
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    mutate({ name, email, password, phone });
  };

  return (
    <section data-easytag="id1-react/src/pages/Register.jsx">
      <div data-easytag="id2-react/src/pages/Register.jsx" className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-10">
        <h2 data-easytag="id3-react/src/pages/Register.jsx" className="text-2xl font-semibold mb-6">Регистрация</h2>
        <form data-easytag="id4-react/src/pages/Register.jsx" onSubmit={onSubmit} className="rounded-2xl border border-line bg-card p-6 shadow-soft space-y-5">
          <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)} aria-label="Имя" />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          <Input label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Телефон" />
          <Input label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Пароль" />
          {error && <p data-easytag="id5-react/src/pages/Register.jsx" className="text-sm text-red-500">{error}</p>}
          <Button data-easytag="id6-react/src/pages/Register.jsx" type="submit" disabled={isPending}>Зарегистрироваться</Button>
          <p data-easytag="id7-react/src/pages/Register.jsx" className="text-sm text-muted">
            Уже есть аккаунт?{' '}
            <Link data-easytag="id8-react/src/pages/Register.jsx" to="/login" className="text-accent hover:underline">Войти</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
