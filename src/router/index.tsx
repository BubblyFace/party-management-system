import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Spin } from 'antd';

// 懒加载页面组件
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const Login = React.lazy(() => import('../components/Login'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const DutyManagement = React.lazy(() => import('../pages/DutyManagement'));
const MeetingManagement = React.lazy(() => import('../pages/MeetingManagement'));
const EducationManagement = React.lazy(() => import('../pages/EducationManagement'));
const InspectionManagement = React.lazy(() => import('../pages/InspectionManagement'));
const PortalApp = React.lazy(() => import('../pages/portal/App'));

// 用户角色枚举
enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member'
}

// 加载组件包装器
const LazyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh' 
    }}>
      <Spin size="large" />
    </div>
  }>
    {children}
  </Suspense>
);

// 路由守卫组件
interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: UserRole;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  requireAuth = true, 
  requireRole 
}) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  if (requireAuth && !currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireRole && currentUser?.role !== requireRole) {
    return <Navigate to="/portal" replace />;
  }
  
  return <>{children}</>;
};

// 创建路由配置
export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <LazyWrapper>
        <Login />
      </LazyWrapper>
    ),
  },
  {
    path: '/',
    element: (
      <RouteGuard>
        <LazyWrapper>
          <MainLayout />
        </LazyWrapper>
      </RouteGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyWrapper>
            <PortalApp />
          </LazyWrapper>
        ),
      },
      {
        path: 'portal',
        element: (
          <LazyWrapper>
            <PortalApp />
          </LazyWrapper>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <LazyWrapper>
            <Dashboard />
          </LazyWrapper>
        ),
      },
      {
        path: 'duty',
        element: (
          <RouteGuard requireRole={UserRole.ADMIN}>
            <LazyWrapper>
              <DutyManagement />
            </LazyWrapper>
          </RouteGuard>
        ),
      },
      {
        path: 'meeting',
        element: (
          <RouteGuard requireRole={UserRole.ADMIN}>
            <LazyWrapper>
              <MeetingManagement />
            </LazyWrapper>
          </RouteGuard>
        ),
      },
      {
        path: 'education',
        element: (
          <RouteGuard requireRole={UserRole.ADMIN}>
            <LazyWrapper>
              <EducationManagement />
            </LazyWrapper>
          </RouteGuard>
        ),
      },
      {
        path: 'inspection',
        element: (
          <RouteGuard requireRole={UserRole.ADMIN}>
            <LazyWrapper>
              <InspectionManagement />
            </LazyWrapper>
          </RouteGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]); 