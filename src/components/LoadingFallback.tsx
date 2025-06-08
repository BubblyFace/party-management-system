import React from 'react';
import { Spin } from 'antd';

const LoadingFallback: React.FC = () => (
  <div 
    style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '16px'
    }}
  >
    <Spin size="large" />
    <div style={{ color: '#666', fontSize: '14px' }}>
      加载中...
    </div>
  </div>
);

export default LoadingFallback; 