import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import { router } from './router';
import { initializeSystemData } from './utils/mockData';

const App: React.FC = () => {
  useEffect(() => {
    // 初始化系统数据
    initializeSystemData();
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
