import React from 'react';
import { ConfigProvider, Card, Button, Typography } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const { Title, Paragraph } = Typography;

const SimpleApp: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <div style={{ 
        padding: '50px', 
        minHeight: '100vh', 
        background: '#f0f2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Card style={{ maxWidth: 600, width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#d73527' }}>
            🏛️ 党建管理系统
          </Title>
          <Paragraph>
            系统正在运行中！这说明基础的React和Ant Design组件工作正常。
          </Paragraph>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button 
              type="primary" 
              size="large"
              onClick={() => {
                console.log('测试按钮点击');
                alert('系统运行正常！');
              }}
            >
              测试系统
            </Button>
          </div>
          <div style={{ marginTop: 24, fontSize: '12px', color: '#666' }}>
            <p>部署时间: {new Date().toLocaleString()}</p>
            <p>环境: {process.env.NODE_ENV || 'unknown'}</p>
            <p>URL: {window.location.href}</p>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default SimpleApp; 