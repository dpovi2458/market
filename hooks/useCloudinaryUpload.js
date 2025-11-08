"use client";
import { useState } from 'react';

/**
 * Hook para subir imágenes directamente a Cloudinary desde el navegador
 * Modo simplificado: usa el preset por defecto de Cloudinary
 */
export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file) => {
    if (!file) throw new Error('No file provided');

    // Validaciones en el cliente
    if (!file.type.startsWith('image/')) {
      throw new Error('Solo se permiten imágenes');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La imagen no debe superar 5MB');
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      throw new Error('Cloudinary no está configurado. Falta NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    }

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      // Usa upload_preset si existe, sino Cloudinary usará el preset por defecto
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      if (uploadPreset) {
        formData.append('upload_preset', uploadPreset);
      } else {
        // Fallback: usa el preset unsigned por defecto
        // Cloudinary automáticamente permite uploads unsigned si está habilitado
        formData.append('upload_preset', 'ml_default');
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      setUploading(false);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Cloudinary error:', errorData);
        throw new Error(errorData?.error?.message || 'Error al subir imagen a Cloudinary');
      }

      const data = await response.json();
      setProgress(100);
      return data.secure_url;
    } catch (error) {
      setUploading(false);
      console.error('Upload error:', error);
      throw error;
    }
  };

  return { uploadImage, uploading, progress };
}
