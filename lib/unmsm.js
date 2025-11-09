/**
 * Servicio de utilidades para validación y extracción de datos UNMSM
 */

const UNMSM_DOMAIN = 'unmsm.edu.pe';
const FACULTADES_UNMSM = {
  'fcc': 'Facultad de Ciencias Contables',
  'fcf': 'Facultad de Ciencias Farmacéuticas y Bioquímica',
  'fd': 'Facultad de Derecho',
  'fec': 'Facultad de Educación',
  'feca': 'Facultad de Electrónica y Ciencias',
  'fcs': 'Facultad de Ciencias Sociales',
  'fim': 'Facultad de Ingeniería Industrial',
  'fiis': 'Facultad de Ingeniería de Sistemas',
  'fiqt': 'Facultad de Química e Ingeniería Química',
  'fmvz': 'Facultad de Medicina Veterinaria',
  'fcm': 'Facultad de Medicina',
  'fc': 'Facultad de Ciencias',
};

/**
 * Valida que el email sea institucional UNMSM
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
export function isValidUNMSMEmail(email) {
  if (!email) return false;
  return email.toLowerCase().endsWith(`@${UNMSM_DOMAIN}`) || 
         email.toLowerCase().endsWith('@unmsm.edu.pe');
}

/**
 * Extrae información del email UNMSM
 * Formato típico: nombre.apellido@fcXX.unmsm.edu.pe o codigo@unmsm.edu.pe
 * @param {string} email - Email institucional
 * @returns {object} { nombre, apellido, facultad, codigo, rolEstimado }
 */
export function extractDataFromUNMSMEmail(email) {
  if (!isValidUNMSMEmail(email)) {
    throw new Error('Email no es institucional UNMSM');
  }

  const emailLower = email.toLowerCase();
  const [localPart, domain] = emailLower.split('@');
  
  let nombre = '';
  let apellido = '';
  let facultad = 'Facultad General';
  let codigo = '';
  let rolEstimado = 'estudiante';

  // Extraer facultad del dominio (ej: fc.unmsm.edu.pe -> fc)
  if (domain.includes('unmsm.edu.pe')) {
    const facultadCode = domain.split('.')[0];
    if (facultadCode !== 'unmsm' && FACULTADES_UNMSM[facultadCode]) {
      facultad = FACULTADES_UNMSM[facultadCode];
    }
  }

  // Procesar la parte local del email
  // Si es solo números, es código de estudiante
  if (/^\d+$/.test(localPart)) {
    codigo = localPart;
    rolEstimado = 'estudiante';
    nombre = `Estudiante ${codigo}`;
    apellido = 'UNMSM';
  }
  // Si contiene puntos, probablemente sea nombre.apellido
  else if (localPart.includes('.')) {
    const partes = localPart.split('.');
    nombre = capitalize(partes[0]);
    apellido = capitalize(partes.slice(1).join(' '));
    // Intentar extraer código si está presente
    const numeroMatch = localPart.match(/\d+/);
    if (numeroMatch) {
      codigo = numeroMatch[0];
    }
  }
  // Si contiene guiones o es solo una palabra
  else {
    nombre = capitalize(localPart);
    // Detectar si es docente por patrón
    if (localPart.includes('doc') || localPart.includes('prof')) {
      rolEstimado = 'docente';
    } else if (localPart.includes('admin') || localPart.includes('staff')) {
      rolEstimado = 'administrativo';
    }
  }

  return {
    nombre: nombre || 'Usuario UNMSM',
    apellido: apellido || '',
    facultad,
    codigo: codigo || localPart,
    rolEstimado,
    emailInstitucional: email.toLowerCase()
  };
}

/**
 * Capitaliza la primera letra de una palabra
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Genera una contraseña temporal segura para el usuario
 * @returns {string} Contraseña de 12 caracteres
 */
export function generateTempPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Valida la contraseña (mínimo 6 caracteres)
 */
export function validatePassword(password) {
  if (!password || password.length < 6) {
    return false;
  }
  return true;
}
