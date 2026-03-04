import { useState, useCallback } from 'react';
import type { Message, ApiConfig, ChatRequest } from '@/types/chat';

export function useChat(apiConfig: ApiConfig) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const sendMessage = useCallback(async (text: string, imageBase64?: string) => {
    if (!apiConfig.apiKey) {
      setError('请先配置 API Key');
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      imageUrl: imageBase64,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];
      
      if (imageBase64) {
        content.push({
          type: 'image_url',
          image_url: {
            url: imageBase64,
          },
        });
      }
      
      content.push({
        type: 'text',
        text: text,
      });

      const requestBody: ChatRequest = {
        model: apiConfig.model,
        messages: [
          {
            role: 'user',
            content,
          },
        ],
      };

      const response = await fetch(apiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || '无响应',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '发送消息失败';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [apiConfig]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
