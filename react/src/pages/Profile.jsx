import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Profile = () => {
  const queryClient = useQueryClient();
  const { data: me, isLoading, isError } = useQuery({ queryKey: ['me'], queryFn: getMe });

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);

  React.useEffect(() => {
    if (me) {
      setName(me.name || '');
      setPhone(me.phone || '');
    }
  }, [me]);

  const { mutate, isPending } = useMutation({
    mutationFn: (fd) => updateMe(fd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const onSave = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    fd.append('phone', phone);
    if (avatar) fd.append('avatar', avatar);
    mutate(fd);
  };

  if (isLoading) return <p data-easytag="id1-react/src/pages/Profile.jsx" className="mx-auto max-w-6xl px-4 py-10 text-muted">Загрузка...</p>;
  if (isError) return <p data-easytag="id2-react/src/pages/Profile.jsx" className="mx-auto max-w-6xl px-4 py-10 text-red-500">Ошибка загрузки профиля</p>;

  return (
    <section data-easytag="id3-react/src/pages/Profile.jsx" className="">
      <div data-easytag="id4-react/src/pages/Profile.jsx" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 data-easytag="id5-react/src/pages/Profile.jsx" className="text-2xl font-semibold mb-6">Профиль</h2>

        <div data-easytag="id6-react/src/pages/Profile.jsx" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form data-easytag="id7-react/src/pages/Profile.jsx" onSubmit={onSave} className="lg:col-span-5 rounded-2xl border border-line bg-card p-6 shadow-soft space-y-5">
            <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)} aria-label="Имя" />
            <Input label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Телефон" />
            <div data-easytag="id8-react/src/pages/Profile.jsx">
              <label data-easytag="id9-react/src/pages/Profile.jsx" className="block mb-1 text-sm text-muted">Аватар</label>
              <input data-easytag="id10-react/src/pages/Profile.jsx" type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} aria-label="Загрузка аватара" />
            </div>
            <Button data-easytag="id11-react/src/pages/Profile.jsx" type="submit" disabled={isPending}>Сохранить</Button>
          </form>

          <div data-easytag="id12-react/src/pages/Profile.jsx" className="lg:col-span-7">
            <h3 data-easytag="id13-react/src/pages/Profile.jsx" className="text-xl font-semibold mb-4">Мои объявления</h3>
            <div data-easytag="id14-react/src/pages/Profile.jsx" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(me?.ads || []).map((ad) => (
                <div data-easytag={`id15-${ad.id}-react/src/pages/Profile.jsx`} key={ad.id} className="rounded-2xl border border-line bg-card p-4 shadow-soft">
                  <p data-easytag={`id16-${ad.id}-react/src/pages/Profile.jsx`} className="font-medium mb-2">{ad.title}</p>
                  <p data-easytag={`id17-${ad.id}-react/src/pages/Profile.jsx`} className="text-accent mb-3">{ad.price} ₽</p>
                  <div data-easytag={`id18-${ad.id}-react/src/pages/Profile.jsx`} className="flex gap-3">
                    <Link data-easytag={`id19-${ad.id}-react/src/pages/Profile.jsx`} to={`/ads/${ad.id}/edit`} className="text-sm text-accent hover:underline">Редактировать</Link>
                    <Link data-easytag={`id20-${ad.id}-react/src/pages/Profile.jsx`} to={`/ads/${ad.id}`} className="text-sm text-muted hover:text-black">Открыть</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
