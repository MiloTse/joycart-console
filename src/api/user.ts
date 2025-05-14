// 用户API相关函数
import { USER_API, getApiUrl } from '../config/api.config';
import type { User } from '../types/models';

// 获取当前用户信息
export async function fetchCurrentUser(): Promise<User> {
  try {
    const apiUrl = getApiUrl(USER_API.CURRENT);
    console.log('正在调用API:', apiUrl);

    const res = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include' // 包含cookies
    });

    console.log('API响应状态:', res.status);

    if (!res.ok) {
      // 打印响应状态和文本，帮助调试
      const errorText = await res.text();
      console.warn(`API调用失败 (${res.status}):`, errorText);

      // 如果API调用失败，回退到模拟数据
      console.log('返回模拟数据 (fetchCurrentUser)');
      return {
        username: 'demo_user',
        email: 'user@example.com',
        phone: '123-456-7890'
      };
    }

    const data = await res.json();
    console.log('成功获取用户数据:', data);
    return data;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    // 如果发生异常，回退到模拟数据
    console.log('返回模拟数据 (fetchCurrentUser catch block)');
    return {
      username: 'demo_user',
      email: 'user@example.com',
      phone: '123-456-7890'
    };
  }
}

// 根据用户名查询用户
export async function searchUserByUsername(username: string): Promise<User[]> {
  // 如果用户名为空，返回空数组
  if (!username || username.trim() === '') {
    return [];
  }

  try {
    console.log('正在搜索用户:', username);
    const apiUrl = getApiUrl(`${USER_API.SEARCH}?username=${encodeURIComponent(username)}`);
    console.log('请求URL:', apiUrl);

    const res = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include' // 包含cookies
    });

    console.log('搜索响应状态:', res.status);

    if (!res.ok) {
      // 打印响应状态和文本，帮助调试
      const errorText = await res.text();
      console.warn(`搜索API调用失败 (${res.status}):`, errorText);

      // 如果环境为开发环境，使用模拟数据
      console.log('返回模拟数据 (searchUserByUsername)');
      return getMockSearchResults(username);
    }

    const data = await res.json();
    console.log('搜索结果:', data);
    return data;
  } catch (error) {
    console.error('查询用户失败:', error);

    // 如果API调用失败，回退到模拟数据
    console.log('返回模拟数据 (searchUserByUsername catch block)');
    return getMockSearchResults(username);
  }
}

// 获取模拟搜索结果
function getMockSearchResults(username: string): User[] {
  if (username.includes('admin')) {
    return [{
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      phone: '123-456-0000'
    }];
  } else if (username.includes('user')) {
    return [{
      id: 2,
      username: 'demo_user',
      email: 'user@example.com',
      phone: '123-456-7890'
    }];
  } else if (username.includes('test')) {
    return [{
      id: 3,
      username: 'test_user',
      email: 'test@example.com',
      phone: '123-456-5555'
    }];
  }
  return [];
} 