"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/vendedor/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ usuario, password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      router.replace('/vendedor/dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl p-6 border">
      <h1 className="text-xl font-semibold mb-4">Acceso Vendedor</h1>
      <form onSubmit={submit} className="space-y-3">
        <Input label="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-danger text-sm">{error}</p>}
        <Button loading={loading} type="submit">Ingresar</Button>
      </form>
    </div>
  );
}
