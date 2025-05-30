import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 设置响应式字体大小
document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';

window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

