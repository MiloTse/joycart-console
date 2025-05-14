/**
 * API配置文件
 * 
 * 集中管理所有API相关的常量，便于统一修改
 */

// 当前环境
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

// 判断是否为本地开发环境
const isLocalDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// API基础URL - 根据环境配置
// 在本地开发环境中，我们使用相对路径，这样API请求会被Vite的开发服务器代理
// 在Docker开发和生产环境中，我们使用完整的URL
let baseUrl = '';
if (isLocalDevelopment) {
  // 本地开发环境使用相对路径，依赖Vite代理
  baseUrl = '';
  console.log('使用本地开发模式（相对路径）');
} else {
  // Docker或生产环境使用完整URL
  baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082';
  console.log('使用指定API URL:', baseUrl);
}

export const API_BASE_URL = baseUrl;

// API路径前缀
export const API_PREFIX = '/api';

// 用户相关API路径
export const USER_API = {
  BASE: `${API_PREFIX}/users`,
  CURRENT: `${API_PREFIX}/users/me`,
  SEARCH: `${API_PREFIX}/users/search`,
};

// 产品相关API路径
export const PRODUCT_API = {
  BASE: `${API_PREFIX}/products`,
  DETAIL: (id: number | string) => `${API_PREFIX}/products/${id}`,
};

// API响应状态
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// API超时设置（毫秒）
export const API_TIMEOUT = 10000;

// CORS设置 - 根据环境动态设置
export const CORS_SETTINGS = {
  ORIGIN: APP_ENV === 'production'
    ? 'https://joycart.com'
    : APP_ENV === 'staging'
      ? 'https://staging.joycart.com'
      : 'http://localhost:8080',
};

/**
 * 获取完整的API URL
 * @param path API路径
 * @returns 完整的API URL
 */
export const getApiUrl = (path: string): string => {
  // 在本地开发环境中，我们只需要路径即可，因为Vite会代理API请求
  // 在其他环境中，我们需要完整的URL
  return `${API_BASE_URL}${path}`;
};

// 导出调试信息
console.log(`[API Config] Environment: ${APP_ENV}`);
console.log(`[API Config] API Base URL: ${API_BASE_URL ? API_BASE_URL : '(使用相对路径)'}`);
console.log(`[API Config] 完整URL示例: ${getApiUrl('/api/users/me')}`);

export default {
  APP_ENV,
  API_BASE_URL,
  API_PREFIX,
  USER_API,
  PRODUCT_API,
  API_STATUS,
  API_TIMEOUT,
  CORS_SETTINGS,
  getApiUrl,
}; 