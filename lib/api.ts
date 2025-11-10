import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export interface APIRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

export interface APIResponse {
  status_code: number;
  headers?: Record<string, string>;
  body?: string;
  error?: string;
}

export interface DebugRequest {
  issue_description: string;
  api_request?: APIRequest;
  api_response?: APIResponse;
  openapi_spec?: any;
  auth_type?: string;
  auth_credentials?: Record<string, string>;
}

export interface DebugResponse {
  root_cause: string;
  solution: string;
  analysis_results: Record<string, any>;
  status: string;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const debugAPI = async (data: DebugRequest): Promise<DebugResponse> => {
  const response = await apiClient.post<DebugResponse>('/debug', data);
  return response.data;
};

export const testRequest = async (request: APIRequest) => {
  const response = await apiClient.post('/test-request', request);
  return response.data;
};

export const healthCheck = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};
