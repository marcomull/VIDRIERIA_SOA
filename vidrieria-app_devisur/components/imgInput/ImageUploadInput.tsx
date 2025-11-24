import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, XCircle, Loader2 } from 'lucide-react';
import { uploadImage } from '@/services/catalogo/mediaService';
import { getToken } from '@/lib/auth';

interface ImageUploadInputProps {
  label: string;
  folderName: string;
  initialImageUrl?: string | null;
  onUploadSuccess: (url: string | null) => void;
  onUploadError: (error: string) => void;
}

export function ImageUploadInput({
  label,
  folderName,
  initialImageUrl,
  onUploadSuccess,
  onUploadError,
}: ImageUploadInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = getToken();

  useEffect(() => {
    if (!selectedFile) {
        setPreviewUrl(initialImageUrl || null);
    }
  }, [initialImageUrl, selectedFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => { setPreviewUrl(reader.result as string); };
      reader.readAsDataURL(file);
    } else {
        setSelectedFile(null);
        setPreviewUrl(initialImageUrl || null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    onUploadError("");
    try {
      const imageUrl = await uploadImage(selectedFile, folderName, token);
      onUploadSuccess(imageUrl);
      setSelectedFile(null);
      setPreviewUrl(imageUrl);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : "Error desconocido al subir imagen.";
       console.error("Upload error en componente:", error);
       onUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
      setSelectedFile(null);
      setPreviewUrl(null);
      onUploadSuccess(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  }; 

  return (
    <div>
      <Label htmlFor={`image-upload-${folderName}`}>{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        <Input
          id={`image-upload-${folderName}`}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="flex-1"
          disabled={isUploading}
        />
        {selectedFile && !isUploading && (
          <Button type="button" size="sm" onClick={handleUpload} className="gap-1">
            <Upload className="w-4 h-4" /> Subir
          </Button>
        )}
        {isUploading && (
          <Button type="button" size="sm" disabled className="gap-1">
             <Loader2 className="w-4 h-4 animate-spin" /> Subiendo...
          </Button>
        )}
         {(selectedFile || previewUrl) && !isUploading && (
            <Button type="button" variant="ghost" size="icon" onClick={handleClear} title="Quitar imagen seleccionada/actual">
                <XCircle className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </Button>
         )}
      </div>
      {previewUrl && (
        <div className="mt-2 text-center">
          <img src={previewUrl} alt="Previsualización" className="max-h-32 inline-block rounded border" />
           {!selectedFile && <p className="text-xs text-muted-foreground mt-1">Imagen actual</p>}
           {selectedFile && <p className="text-xs text-muted-foreground mt-1">Previsualización (pendiente subir)</p>}
        </div>
      )}
    </div>
  );
} 

