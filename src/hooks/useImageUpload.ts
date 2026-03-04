import { useState, useCallback } from 'react';

export function useImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    setIsUploading(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImage(result);
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
  }, []);

  return {
    image,
    isUploading,
    handleFileSelect,
    clearImage,
  };
}
