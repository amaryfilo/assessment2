export interface IApiError {
  message: string;
  status?: number;
}

export interface ICtx {
  items: IItem[];
  loading: boolean;
  fetchItems: (query?: string) => void;
}

export interface IItem {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface IApiConfig {
  baseUrl: string;
  timeout: number;
}

// export interface IAppInfo {
//   name: string;
//   version: string;
//   environment: 'production' | 'development';
// }

// export interface IUIConfig {
//   theme: 'light' | 'dark';
//   primaryColor: string;
//   logoPath: string;
// }

// export interface IFeatureFlags {
//   enableAIAssistant: boolean;
//   enableNFTSupport: boolean;
//   enableAnalytics: boolean;
// }
// or
// export type TFeatureFlags = Record<string, boolean>;

// export type TLanguages = 'en' | 'ru';
