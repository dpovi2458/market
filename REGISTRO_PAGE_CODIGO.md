# Código para app/vendedor/registro/page.js

Reemplaza todo el contenido del archivo con este código:

\`\`\`javascript
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function RegistroPage() {
  const [formData, setFormData] = useState({ email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [step, setStep] = useState(1);
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [devOtpCode, setDevOtpCode] = useState('');
  
  const router = useRouter();
  const { data: session, status } = useSession();
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/vendedor/login');
    }
  }, [status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@unmsm\.edu\.pe$/i;
    return emailRegex.test(email);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setError('Ingresa un email institucional UNMSM válido');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/vendedor/otp-request', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email: formData.email })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar el código');
      }
      
      if (isDevelopment && data.dev_code) {
        setDevOtpCode(data.dev_code);
      }
      
      setStep(2);
      setOtpTimer(60);
      setCanResend(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setOtpTimer(60);
    await handleRequestOTP({ preventDefault: () => {} });
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (otpCode.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/vendedor/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, codigo: otpCode })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Código incorrecto');
      }

      await handleCreateVendor();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreateVendor = async () => {
    try {
      const res = await fetch('/api/vendedor/create-with-facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_institucional: formData.email,
          facebook_id: session.user.id,
          nombre: session.user.name,
          email_facebook: session.user.email,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear cuenta');
      }

      router.replace('/vendedor/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verificación UNMSM</h1>
          <p className="text-base text-blue-600 font-semibold mb-1">
            Hola, {session?.user?.name}
          </p>
          <p className="text-sm text-gray-600">Verifica tu email institucional</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Institucional UNMSM
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="codigo@unmsm.edu.pe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <p className="mt-2 text-xs text-gray-500">
                  Debe ser tu correo institucional @unmsm.edu.pe
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar código'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {isDevelopment && devOtpCode && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-xs font-mono text-yellow-800">DEV: {devOtpCode}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Código de Verificación
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Código enviado a {formData.email}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otpCode.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verificando...' : 'Verificar y crear cuenta'}
              </button>

              {otpTimer > 0 ? (
                <p className="text-center text-sm text-gray-500">
                  Reenviar código en {otpTimer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading || !canResend}
                  className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reenviar código
                </button>
              )}
            </form>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div className="text-center">
            <button
              onClick={() => signOut({ callbackUrl: '/vendedor/login' })}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Cancelar y cerrar sesión
            </button>
          </div>
          
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Market Facultad UNMSM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
\`\`\`

## Cómo aplicar:

1. Abre `app/vendedor/registro/page.js`
2. Selecciona todo (Ctrl+A)
3. Elimina todo
4. Copia y pega el código de arriba
5. Guarda el archivo
