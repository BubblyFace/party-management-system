import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Space } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BookOutlined,
  AuditOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { User } from '../types';
import { UserRole } from '../types';
import Dashboard from './Dashboard';
import DutyManagement from './DutyManagement';
import MeetingManagement from './MeetingManagement';
import EducationManagement from './EducationManagement';
import InspectionManagement from './InspectionManagement';

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

interface AdminPanelProps {
  currentUser: User;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, onLogout }) => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '工作概览'
    },
    ...(currentUser.role === UserRole.ADMIN ? [
      {
        key: 'duty',
        icon: <FileTextOutlined />,
        label: '履职事项管理'
      },
      {
        key: 'meeting',
        icon: <CalendarOutlined />,
        label: '会议台账管理'
      },
      {
        key: 'education',
        icon: <BookOutlined />,
        label: '教育学习管理'
      },
      {
        key: 'inspection',
        icon: <AuditOutlined />,
        label: '巡视整改管理'
      }
    ] : [])
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'duty':
        return <DutyManagement currentUser={currentUser} />;
      case 'meeting':
        return <MeetingManagement currentUser={currentUser} />;
      case 'education':
        return <EducationManagement currentUser={currentUser} />;
      case 'inspection':
        return <InspectionManagement currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{ 
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{ 
          padding: '16px', 
          textAlign: 'center', 
          borderBottom: '1px solid #f0f0f0' 
        }}>
          <Title level={4} style={{ 
            margin: 0, 
            color: '#1890ff',
            fontSize: collapsed ? 14 : 18
          }}>
            {collapsed ? '党建' : '党建管理系统'}
          </Title>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => setSelectedKey(key)}
          style={{ border: 'none', paddingTop: 16 }}
        />
      </Sider>
      
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {menuItems.find(item => item.key === selectedKey)?.label}
            </Title>
          </div>
          
          <Space>
            <span>
              {currentUser.name} 
              <span style={{ color: '#999', marginLeft: 8 }}>
                ({currentUser.role === UserRole.ADMIN ? '管理员' : '党委成员'})
              </span>
            </span>
            <Button 
              type="text" 
              icon={<LogoutOutlined />}
              onClick={onLogout}
            >
              退出登录
            </Button>
          </Space>
        </Header>
        
        <Content style={{ overflow: 'auto' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel; 