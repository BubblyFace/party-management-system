import React, { useState } from 'react';
import { Card, Select, Button, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserStorage } from '../utils/storage';
import type { User } from '../types';
import { UserRole } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;

interface LoginProps {
  onLogin?: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const users = UserStorage.getAll();
  const members = users.filter(user => user.role === UserRole.MEMBER);
  const admins = users.filter(user => user.role === UserRole.ADMIN);

  const handleLogin = () => {
    if (!selectedUserId) return;
    
    setLoading(true);
    const selectedUser = UserStorage.getById(selectedUserId);
    
    if (selectedUser) {
      console.log('Login - 用户登录:', selectedUser);
      // 模拟登录延迟
      setTimeout(() => {
        UserStorage.setCurrentUser(selectedUser);
        if (onLogin) {
          onLogin(selectedUser);
        }
        // 根据用户角色跳转到对应的门户首页
        const redirectPath = selectedUser.role === UserRole.ADMIN ? '/dashboard' : '/portal';
        console.log('Login - 登录完成，跳转到', redirectPath);
        navigate(redirectPath);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 500,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          borderRadius: '12px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            fontSize: 48, 
            color: '#1890ff', 
            marginBottom: 16 
          }}>
            <UserOutlined />
          </div>
          <Title level={2} style={{ color: '#333', marginBottom: 8 }}>
            党建管理系统
          </Title>
          <Text type="secondary">
            请选择登录用户进行体验
          </Text>
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={4} style={{ marginBottom: 12 }}>
              党委成员登录
            </Title>
            <Select
              style={{ width: '100%' }}
              placeholder="选择党委成员"
              value={members.some(m => m.id === selectedUserId) ? selectedUserId : undefined}
              onChange={setSelectedUserId}
              size="large"
            >
              {members.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.name} - {user.department} ({user.level === 'province' ? '省级' : user.level === 'city' ? '市级' : '县级'})
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Title level={4} style={{ marginBottom: 12 }}>
              管理员登录
            </Title>
            <Select
              style={{ width: '100%' }}
              placeholder="选择管理员"
              value={admins.some(a => a.id === selectedUserId) ? selectedUserId : undefined}
              onChange={setSelectedUserId}
              size="large"
            >
              {admins.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.name} - {user.department} ({user.level === 'province' ? '省级' : user.level === 'city' ? '市级' : '县级'})
                </Option>
              ))}
            </Select>
          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            disabled={!selectedUserId}
            onClick={handleLogin}
            style={{ 
              height: 48,
              fontSize: 16,
              borderRadius: 8
            }}
          >
            {loading ? '登录中...' : '登录系统'}
          </Button>
        </Space>

        <div style={{ 
          marginTop: 32, 
          padding: 16, 
          background: '#f5f5f5', 
          borderRadius: 8 
        }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            <strong>系统说明：</strong><br />
            • 党委成员：查看个人待办事项和数据汇总<br />
            • 管理员：管理各类台账，处理派单任务<br />
            • 所有数据存储在浏览器本地，刷新页面后数据仍然保留
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login; 