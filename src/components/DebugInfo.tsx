import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const DebugInfo: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  return (
    <div style={{ padding: '50px', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="调试信息">
        <Title level={4}>系统状态检查</Title>
        <p><Text strong>环境:</Text> {process.env.NODE_ENV || 'unknown'}</p>
        <p><Text strong>时间:</Text> {new Date().toLocaleString()}</p>
        <p><Text strong>URL:</Text> {window.location.href}</p>
        <p><Text strong>用户状态:</Text> {currentUser ? '已登录' : '未登录'}</p>
        {currentUser && (
          <>
            <p><Text strong>用户名:</Text> {currentUser.username}</p>
            <p><Text strong>角色:</Text> {currentUser.role}</p>
          </>
        )}
        <p><Text strong>LocalStorage:</Text> {localStorage.length} 项</p>
        <p><Text strong>React版本:</Text> {React.version}</p>
      </Card>
    </div>
  );
};

export default DebugInfo; 