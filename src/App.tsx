import { useState, useEffect, useRef } from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ApiSettings } from '@/components/ApiSettings';
import { useChat } from '@/hooks/useChat';
import { useImageUpload } from '@/hooks/useImageUpload';
import type { ApiConfig } from '@/types/chat';
import './App.css';

const DEFAULT_CONFIG: ApiConfig = {
  apiKey: '',
  apiUrl: 'https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions',
  model: 'seed-1-8-251228',
};

function App() {
  const [apiConfig, setApiConfig] = useState<ApiConfig>(() => {
    const saved = localStorage.getItem('chatbot_api_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });
  
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat(apiConfig);
  const { image, handleFileSelect, clearImage } = useImageUpload();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatbot_api_config', JSON.stringify(apiConfig));
  }, [apiConfig]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string, imageBase64?: string) => {
    await sendMessage(text, imageBase64);
    clearImage();
  };

  const handleClear = () => {
    clearMessages();
    clearImage();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">AI 聊天助手</h1>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              disabled={messages.length === 0}
              title="清空对话"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
            <ApiSettings config={apiConfig} onSave={setApiConfig} />
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-medium text-gray-700 mb-2">开始对话</h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                发送消息或上传图片开始与 AI 助手对话。点击右上角设置按钮配置 API。
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
              错误: {error}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
        image={image}
        onImageSelect={handleFileSelect}
        onClearImage={clearImage}
      />
    </div>
  );
}

export default App;
