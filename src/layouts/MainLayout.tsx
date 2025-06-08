import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Typography } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  FileTextOutlined,
  CalendarOutlined,
  BookOutlined,
  AuditOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BankOutlined,
} from '@ant-design/icons';
import type { User } from '../types';
import { UserRole } from '../types';
import { UserStorage } from '../utils/storage';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = UserStorage.getCurrentUser();
    if (!user) {
      console.log('===user===1', user);
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    UserStorage.logout();
    setCurrentUser(null);
    console.log('===user===2', currentUser);
    navigate('/login');
  };

  const menuItems = [
    // 根据用户角色显示不同的门户首页
    ...(currentUser?.role === UserRole.ADMIN ? [
      {
        key: '/dashboard',
        icon: <BankOutlined />,
        label: '门户首页',
      },
    ] : [
      {
        key: '/portal',
        icon: <BankOutlined />,
        label: '门户首页',
      },
    ]),
    // 管理功能菜单 - 所有登录用户都可以访问
    {
      key: '/duty',
      icon: <FileTextOutlined />,
      label: '履职事项管理',
    },
    {
      key: '/meeting',
      icon: <CalendarOutlined />,
      label: '会议台账管理',
    },
    {
      key: '/education',
      icon: <BookOutlined />,
      label: '教育学习管理',
    },
    {
      key: '/inspection',
      icon: <AuditOutlined />,
      label: '巡视整改管理',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
      disabled: true,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 获取当前页面标题
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => item.key === currentPath);
    return currentMenuItem ? currentMenuItem.label : '党建管理系统';
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="sider-logo">
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: collapsed ? '0' : '8px'
          }}>
            <BankOutlined style={{ 
              fontSize: collapsed ? '24px' : '28px', 
              color: '#ff4d4f',
              textShadow: '0 0 10px rgba(255, 77, 79, 0.5)'
            }} />
            {!collapsed && (
              <h4 style={{ 
                margin: 0, 
                color: '#fff', 
                fontSize: '16px',
                fontWeight: 600
              }}>
                党建管理系统
              </h4>
            )}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>
      
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Text strong style={{ fontSize: '18px', marginLeft: '16px', color: '#333' }}>
              {getCurrentPageTitle()}
            </Text>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              textAlign: 'right',
              lineHeight: '1.2',
              marginRight: '8px'
            }}>
              <div style={{ 
                fontWeight: 500, 
                color: '#333',
                fontSize: '14px',
                marginBottom: '2px'
              }}>
                {currentUser.name}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#999',
                whiteSpace: 'nowrap'
              }}>
                {currentUser.department} | {currentUser.role === UserRole.ADMIN ? '管理员' : '党委成员'}
              </div>
            </div>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Avatar 
                style={{ 
                  backgroundColor: '#87d068', 
                  cursor: 'pointer',
                  flexShrink: 0
                }} 
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>
        
        <Content style={{ 
          margin: '24px', 
          padding: 0,
          background: '#f0f2f5',
          minHeight: 'calc(100vh - 112px)',
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 