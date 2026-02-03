import type {
  IApiConfig,
  // IAppInfo,
  // IFeatureFlags,
  // IUIConfig,
  // TLanguages,
} from '../types';

// API endpoints
export const apiConfig: IApiConfig = {
  baseUrl: 'http://localhost:4001/api',
  timeout: 10000, // ms
};

// App metadata
// export const appInfo: IAppInfo = {
//   name: 'frontend',
//   version: '1.0.0',
//   environment: 'development',
// };

// Feature toggles
// export const featureFlags: IFeatureFlags = {
//   enableAIAssistant: true,
//   enableNFTSupport: false,
//   enableAnalytics: true,
// };

// UI/Branding
// export const uiConfig: IUIConfig = {
//   theme: 'light',
//   primaryColor: '#3b82f6',
//   logoPath: '/assets/logo.svg',
// };

// Provider configuration
// export const PROVIDER_URL: string =
//   'https://react-icon-handler.vercel.app/icons/';
// export const PROVIDER_ID: string = '808';

// Other constants
// export const defaultLanguage: TLanguages = 'en';
