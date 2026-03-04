import { useState, useRef, useCallback } from 'react';
import { Send, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (text: string, imageBase64?: string) => void;
  isLoading: boolean;
  image: string | null;
  onImageSelect: (file: File) => void;
  onClearImage: () => void;
}

export function ChatInput({ 
  onSend, 
  isLoading, 
  image, 
  onImageSelect, 
  onClearImage 
}: ChatInputProps) {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    if (!text.trim() && !image) return;
    onSend(text.trim(), image || undefined);
    setText('');
  }, [text, image, onSend]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageSelect]);

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto">
        {image && (
          <div className="mb-3 relative inline-block">
            <img 
              src={image} 
              alt="Preview" 
              className="h-20 rounded-lg object-cover border"
            />
            <button
              onClick={onClearImage}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        <div className="flex gap-2 items-end">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleImageClick}
            disabled={isLoading}
            className="flex-shrink-0"
          >
            <Image className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息... (Shift+Enter 换行)"
              disabled={isLoading}
              className="min-h-[44px] max-h-32 resize-none pr-12 py-2.5"
              rows={1}
            />
          </div>
          
          <Button
            onClick={handleSend}
            disabled={isLoading || (!text.trim() && !image)}
            className="flex-shrink-0"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
