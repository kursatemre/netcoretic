'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  className?: string;
  maxFiles?: number;
  accept?: string;
}

export default function ImageUpload({
  value,
  onChange,
  multiple = false,
  label = 'Görsel Yükle',
  className = '',
  maxFiles = 10,
  accept = 'image/*'
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const images = Array.isArray(value) ? value : value ? [value] : [];

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        if (!multiple && i > 0) break;
        if (images.length + newImages.length >= maxFiles) break;

        const file = files[i];
        
        // Dosyayı base64'e çevir (gerçek projede API'ye yüklenebilir)
        const base64 = await fileToBase64(file);
        newImages.push(base64);
      }

      if (multiple) {
        onChange([...images, ...newImages]);
      } else {
        onChange(newImages[0] || '');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Görsel yüklenirken bir hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    if (multiple) {
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    } else {
      onChange('');
    }
  };

  const handleUrlInput = () => {
    const url = prompt('Görsel URL\'si girin:');
    if (url) {
      if (multiple) {
        onChange([...images, url]);
      } else {
        onChange(url);
      }
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold mb-2">{label}</label>
      )}

      {/* Yükleme Alanı */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-[#F7A072] bg-orange-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
          
          {uploading ? (
            <p className="text-sm text-gray-500">Yükleniyor...</p>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                Görselleri sürükleyip bırakın veya
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#F7A072] rounded-lg hover:bg-[#ff8c5a] transition"
                >
                  Dosya Seç
                </button>
                <button
                  type="button"
                  onClick={handleUrlInput}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  URL Gir
                </button>
              </div>
              <p className="text-xs text-gray-400">
                PNG, JPG, WEBP (Maks. 5MB)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Yüklenen Görseller */}
      {images.length > 0 && (
        <div className={`mt-4 ${multiple ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : ''}`}>
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative group ${multiple ? 'aspect-square' : 'h-48'} rounded-lg overflow-hidden bg-gray-100`}
            >
              <img
                src={img}
                alt={`Görsel ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNNzUgODVINzAuODMzM1YxMTVIMTI5LjE2N1Y4NUgxMjVNNzUgODVWMTE1TTc1IDg1SDgzLjMzMzNNMTI1IDg1VjExNU0xMjUgODVIMTE2LjY2N00xMjUgMTE1SDc1TTgzLjMzMzMgODVIOTEuNjY2N004My4zMzMzIDg1TDkxLjY2NjcgOTcuNU04My4zMzMzIDg1TDEwNCAMTAxTTkxLjY2NjcgODVIMTA0TTkxLjY2NjcgODVWOTcuNU0xMDQgODVIMTE2LjY2N00xMDQgODVWMTAxTTExNi42NjcgODVMMTA0IDEwMU0xMDQgMTAxTDkxLjY2NjcgOTcuNU0xMDQgMTAxTDExNi42NjcgMTE1TTkxLjY2NjcgOTcuNUw3NSAxMTUiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';
                }}
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X size={16} />
              </button>
              {multiple && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Boş Durum (Tekli görsel için) */}
      {!multiple && images.length === 0 && (
        <div className="mt-4 h-48 rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <ImageIcon size={48} className="mx-auto mb-2" />
            <p className="text-sm">Henüz görsel yüklenmedi</p>
          </div>
        </div>
      )}
    </div>
  );
}
