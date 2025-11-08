"use client";
import { useState } from 'react';

/**
 * Hook para subir imágenes directamente a Cloudinary desde el navegador
 * Modo simplificado: usa el preset por defecto de Cloudinary
 */
export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const presetFromEnv = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const uploadImage = async (file) => {
    if (!file) throw new Error('No file provided');

    // Validaciones básicas
    if (!file.type.startsWith('image/')) {
      throw new Error('Solo se permiten imágenes');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La imagen no debe superar 5MB');
    }
    if (!cloudName) {
      throw new Error('Falta NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    }

    // Requerimos un preset unsigned explícito para evitar confusión
    if (!presetFromEnv) {
      throw new Error('Falta NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (crea un preset UNSIGNED en Cloudinary)');
    }

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', presetFromEnv);

      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const response = await fetch(endpoint, { method: 'POST', body: formData });

      // Intentar leer JSON aunque falle
      let payload = null;
      try { payload = await response.json(); } catch { /* swallow */ }

      if (!response.ok) {
        const apiMessage = payload?.error?.message;
        // Mensajes específicos para guiar solución
        if (apiMessage?.toLowerCase().includes('upload preset')) {
          throw new Error(`Cloudinary: preset '${presetFromEnv}' no encontrado o no es UNSIGNED. Verifica en Console → Settings → Upload → Upload Presets.`);
        }
        if (apiMessage?.toLowerCase().includes('unsigned')) {
          throw new Error(`Cloudinary: el preset '${presetFromEnv}' no está en modo Unsigned.`);
        }
        throw new Error(apiMessage || 'Error al subir imagen a Cloudinary');
      }

      // Éxito
      setProgress(100);
      if (!payload?.secure_url) {
        throw new Error('Respuesta de Cloudinary sin secure_url');
      }
      return payload.secure_url;
    } catch (err) {
      console.error('[uploadImage] error:', err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, progress, cloudName, preset: presetFromEnv };
}
