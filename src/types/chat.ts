export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: number;
}

export interface ApiConfig {
  apiKey: string;
  apiUrl: string;
  model: string;
}

export interface ChatRequest {
  model: string;
  messages: Array<{
    role: string;
    content: Array<{
      type: string;
      text?: string;
      image_url?: {
        url: string;
      };
    }>;
  }>;
}

export interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
