"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Estados para OTP
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: password
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResend, setCanResend] = useState(false); // Permitir reenvío manual
  const [devOtpCode, setDevOtpCode] = useState(''); // Para desarrollo - SOLO en modo development
  const [showDevCode, setShowDevCode] = useState(false); // Controlar visibilidad del código dev
  
  const router = useRouter();

  // Detectar si estamos en modo desarrollo
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Timer para reenvío de OTP
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            setCanResend(true); // Habilitar reenvío cuando expire el timer
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  // Verificar si ya tiene sesión activa
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/vendedor/session');
        if (res.ok) {
          router.replace('/vendedor/dashboard');
        }
      } catch (e) {
        // No hacer nada, el usuario necesita hacer login
      }
    };
    checkSession();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@unmsm\.edu\.pe$/i;
    return emailRegex.test(email);
  };

  const validate = () => {
    if (!formData.email.trim()) return 'El email es requerido';
    if (!validateEmail(formData.email)) return 'Usa tu correo institucional UNMSM (ejemplo@unmsm.edu.pe)';
    if (step === 3 && !formData.password) return 'La contraseña es requerida';
    if (step === 3 && formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return null;
  };

  // Solicitar código OTP
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
        if (data.retry_in) {
          setError(`${data.error}. Espera ${data.retry_in} segundos.`);
        } else {
          setError(data.error || 'Error enviando código');
        }
        return;
      }
      
      // Guardar código SOLO en desarrollo
      if (isDevelopment && data.dev_code) {
        setDevOtpCode(data.dev_code);
        setShowDevCode(true); // Mostrar el código en desarrollo
        console.log('🔐 Código OTP (desarrollo):', data.dev_code);
      }
      
      setOtpSent(true);
      setStep(2);
      setOtpTimer(60); // 60 segundos antes de poder reenviar automáticamente
      setCanResend(false); // Deshabilitar reenvío manual hasta que pase el tiempo
      setError('');
    } catch (err) {
      setError(err.message || 'Error al enviar código');
    } finally {
      setLoading(false);
    }
  };

  // Verificar código OTP
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
        body: JSON.stringify({ 
          email: formData.email,
          codigo: otpCode 
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Código inválido');
        if (data.intentos_restantes !== undefined) {
          setError(`${data.error}`);
        }
        return;
      }
      
      // Email verificado, pasar al siguiente paso
      setStep(3);
      setError('');
    } catch (err) {
      setError(err.message || 'Error al verificar código');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio de email con validación
  const handleChangeEmail = () => {
    // Confirmar cambio
    const confirmChange = window.confirm(
      '¿Estás seguro que quieres cambiar el email?\n\n' +
      'Tendrás que solicitar un nuevo código de verificación.'
    );
    
    if (confirmChange) {
      setStep(1);
      setOtpCode('');
      setDevOtpCode('');
      setShowDevCode(false);
      setOtpTimer(0);
      setCanResend(false);
      setError('');
    }
  };

  // Solicitar reenvío inmediato (sin esperar timer)
  const handleResendNow = async () => {
    if (loading) return;
    
    const confirmResend = window.confirm(
      '¿No recibiste el código?\n\n' +
      'Se enviará un nuevo código a tu email institucional.'
    );
    
    if (confirmResend) {
      await handleRequestOTP({ preventDefault: () => {} });
    }
  };

  // Login/Registro final
  // Login/Registro final
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.password || formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/vendedor/login', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          isNewUser: isRegistering,
          emailVerificado: true // Ya pasó la verificación OTP
        }),
        credentials: 'include'
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }
      
      // Redireccionar al dashboard
      router.replace('/vendedor/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFieldInvalid = (field) => {
    return touched[field] && !formData[field].trim();
  };

  // Renderizar según el paso actual
  const renderStep = () => {
    if (step === 1) {
      return renderEmailStep();
    } else if (step === 2) {
      return renderOTPStep();
    } else {
      return renderPasswordStep();
    }
  };

  const renderEmailStep = () => (
    <form onSubmit={handleRequestOTP} className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Correo Institucional UNMSM
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`block w-full pl-10 pr-3 py-3 border ${
              isFieldInvalid('email') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
            } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors`}
            placeholder="tu.nombre@unmsm.edu.pe"
            disabled={loading}
          />
        </div>
        {isFieldInvalid('email') && (
          <p className="mt-2 text-sm text-red-600">Este campo es requerido</p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          ✓ Enviaremos un código de verificación a tu email
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Enviando código...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Continuar</span>
          </>
        )}
      </button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      {/* OTP Info */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-teal-800">
              Hemos enviado un código de 6 dígitos a <strong>{formData.email}</strong>
            </p>
            <p className="mt-1 text-xs text-teal-700">
              Revisa tu bandeja de entrada y tu carpeta de spam
            </p>
            {/* SOLO mostrar código en desarrollo y si showDevCode está activo */}
            {isDevelopment && showDevCode && devOtpCode && (
              <div className="mt-3">
                <p className="text-xs font-mono bg-yellow-100 text-yellow-800 p-2 rounded border border-yellow-300">
                  🔐 <strong>DESARROLLO:</strong> {devOtpCode}
                </p>
                <p className="mt-1 text-xs text-yellow-700">
                  ⚠️ Este código solo se muestra en modo desarrollo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OTP Input con mejoras de accesibilidad */}
      <div>
        <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
          Código de Verificación
        </label>
        <input
          id="otp"
          name="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label="Código de verificación de 6 dígitos"
          aria-describedby="otp-description"
          pattern="[0-9]*"
          maxLength={6}
          value={otpCode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setOtpCode(value);
            setError('');
          }}
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center text-2xl font-mono tracking-widest"
          placeholder="000000"
          disabled={loading}
          autoFocus
        />
        <p id="otp-description" className="mt-2 text-xs text-gray-500 text-center">
          El código expira en 10 minutos
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || otpCode.length !== 6}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Verificando...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Verificar Código</span>
          </>
        )}
      </button>

      {/* Reenviar código - Con opción inmediata */}
      <div className="space-y-3">
        <div className="text-center">
          {otpTimer > 0 && !canResend ? (
            <div>
              <p className="text-sm text-gray-600">
                Podrás reenviar el código en <strong>{otpTimer}</strong> segundos
              </p>
              <button
                type="button"
                onClick={handleResendNow}
                disabled={loading}
                className="mt-2 text-xs text-teal-600 hover:text-teal-700 font-medium underline"
              >
                ¿No recibiste el código? Reenviar ahora
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRequestOTP}
              disabled={loading}
              className="text-sm text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-all"
            >
              🔄 Reenviar código
            </button>
          )}
        </div>

        {/* Cambiar email - Con confirmación */}
        <div className="text-center pt-3 border-t border-gray-200">
          <button
            type="button"
            onClick={handleChangeEmail}
            disabled={loading}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Cambiar email
          </button>
        </div>
      </div>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-green-800">
          ✓ Email verificado: <strong>{formData.email}</strong>
        </p>
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
          {isRegistering ? 'Crea una contraseña' : 'Contraseña'}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegistering ? "new-password" : "current-password"}
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur('password')}
            className={`block w-full pl-10 pr-12 py-3 border ${
              isFieldInvalid('password') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
            } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors`}
            placeholder={isRegistering ? "Al menos 6 caracteres" : "Ingresa tu contraseña"}
            disabled={loading}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {isFieldInvalid('password') && (
          <p className="mt-2 text-sm text-red-600">Este campo es requerido</p>
        )}
        {isRegistering && (
          <p className="mt-2 text-xs text-gray-500">
            Mínimo 6 caracteres para tu seguridad
          </p>
        )}
      </div>

      {/* Info Box */}
      {isRegistering && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
          <div className="flex gap-2">
            <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-teal-800">
              <strong>Primer acceso:</strong> Tu nombre y facultad se completarán automáticamente desde tu email institucional.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{isRegistering ? 'Registrando...' : 'Ingresando...'}</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</span>
          </>
        )}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Vendedor</h1>
          <p className="text-gray-600">
            {step === 1 && 'Ingresa con tu correo institucional UNMSM'}
            {step === 2 && 'Verifica tu email institucional'}
            {step === 3 && (isRegistering ? 'Crea tu contraseña' : 'Ingresa tu contraseña')}
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 2 ? '✓' : '2'}
            </div>
            <div className={`h-1 w-12 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Toggle registro/login - Solo en paso 1 o 3 */}
          {(step === 1 || step === 3) && (
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  setIsRegistering(false);
                  setError('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  !isRegistering 
                    ? 'bg-white text-teal-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  isRegistering 
                    ? 'bg-white text-teal-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Render current step */}
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
