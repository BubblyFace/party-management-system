import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import { router } from './router';
import { initializeSystemData } from './utils/mockData';
import ErrorBoundary from './components/ErrorBoundary';
import DebugInfo from './components/DebugInfo';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      console.log('开始初始化系统数据...');
      
      // 初始化系统数据
      initializeSystemData();
      
      console.log('系统数据初始化完成');
      setIsInitialized(true);
    } catch (error) {
      console.error('初始化失败:', error);
      setHasError(true);
    }
  }, []);

  // 如果初始化失败，显示调试信息
  if (hasError) {
    return (
      <ErrorBoundary>
        <ConfigProvider locale={zhCN}>
          <DebugInfo />
        </ConfigProvider>
      </ErrorBoundary>
    );
  }

  // 如果还没初始化完成，显示加载状态
  if (!isInitialized) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px',
        background: '#f0f2f5'
      }}>
        <div style={{ fontSize: '18px', color: '#333' }}>党建管理系统</div>
        <div style={{ color: '#666' }}>正在初始化...</div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
