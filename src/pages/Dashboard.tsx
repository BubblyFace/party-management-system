import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, List, Tag, Progress, Typography, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BookOutlined,
  AuditOutlined,
  AppstoreOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { DutyStorage, MeetingStorage, EducationStorage, InspectionStorage, UserStorage } from '../utils/storage';
import type { User, DutyItem, Statistics } from '../types';
import { Status, Priority } from '../types';

// 导入portal页面的组件和数据
import HeroSection from './portal/components/HeroSection';
import ModuleContainer from './portal/components/ModuleContainer';
import DashboardCard from './portal/components/DashboardCard';
import { dashboardCards } from './portal/data/mockData';
import './portal/index.css';

const { Text } = Typography;

// 管理员专用的功能卡片，过滤掉工作概览
const adminFunctionCards = dashboardCards.filter(card => card.id !== 1);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [statistics, setStatistics] = useState<Statistics>({
    totalDutyItems: 0,
    completedDutyItems: 0,
    pendingDutyItems: 0,
    overdueDutyItems: 0,
    totalMeetings: 0,
    totalEducationRecords: 0,
    totalInspectionItems: 0,
    completedInspectionItems: 0
  });
  const [myDutyItems, setMyDutyItems] = useState<DutyItem[]>([]);

  useEffect(() => {
    const user = UserStorage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadStatistics(user);
      loadMyTasks(user);
    }
  }, []);

  const loadStatistics = (user: User) => {
    const dutyItems = DutyStorage.getAll();
    const meetings = MeetingStorage.getAll();
    const educationRecords = EducationStorage.getAll();
    const inspectionItems = InspectionStorage.getAll();

    // 根据当前用户过滤相关数据
    const myDuties = dutyItems.filter(item => item.assignedTo === user.id);
    const myInspections = inspectionItems.filter(item => item.responsiblePerson === user.id);

    const completedDutyItems = myDuties.filter(item => item.status === Status.COMPLETED).length;
    const pendingDutyItems = myDuties.filter(item => item.status === Status.PENDING).length;
    const overdueDutyItems = myDuties.filter(item => {
      const dueDate = new Date(item.dueDate);
      const now = new Date();
      return item.status !== Status.COMPLETED && dueDate < now;
    }).length;

    const completedInspectionItems = myInspections.filter(item => item.status === Status.COMPLETED).length;

    setStatistics({
      totalDutyItems: myDuties.length,
      completedDutyItems,
      pendingDutyItems,
      overdueDutyItems,
      totalMeetings: meetings.length,
      totalEducationRecords: educationRecords.length,
      totalInspectionItems: myInspections.length,
      completedInspectionItems
    });
  };

  const loadMyTasks = (user: User) => {
    const dutyItems = DutyStorage.getByAssignedTo(user.id);
    // 按优先级和状态排序
    const sortedItems = dutyItems.sort((a, b) => {
      // 优先显示高优先级和待处理的任务
      if (a.priority === Priority.HIGH && b.priority !== Priority.HIGH) return -1;
      if (b.priority === Priority.HIGH && a.priority !== Priority.HIGH) return 1;
      if (a.status === Status.PENDING && b.status !== Status.PENDING) return -1;
      if (b.status === Status.PENDING && a.status !== Status.PENDING) return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    setMyDutyItems(sortedItems.slice(0, 10)); // 只显示前10个任务
  };

  const handleCardClick = (cardId: number) => {
    const card = adminFunctionCards.find(c => c.id === cardId);
    if (card?.path) {
      navigate(card.path);
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.COMPLETED: return 'success';
      case Status.IN_PROGRESS: return 'processing';
      case Status.PENDING: return 'warning';
      case Status.OVERDUE: return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case Status.COMPLETED: return '已完成';
      case Status.IN_PROGRESS: return '进行中';
      case Status.PENDING: return '待处理';
      case Status.OVERDUE: return '已逾期';
      default: return status;
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH: return 'red';
      case Priority.MEDIUM: return 'orange';
      case Priority.LOW: return 'green';
      default: return 'default';
    }
  };

  const getPriorityText = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH: return '高';
      case Priority.MEDIUM: return '中';
      case Priority.LOW: return '低';
      default: return priority;
    }
  };

  const isOverdue = (dueDate: string, status: Status) => {
    if (status === Status.COMPLETED) return false;
    return new Date(dueDate) < new Date();
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="relative">
        {/* 使用portal的HeroSection */}
        <HeroSection />
        
        {/* 工作概览模块 */}
        <section className="relative z-10 -mt-16 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ModuleContainer
              title="工作概览"
              description={`欢迎您，${currentUser.name} | ${currentUser.department}`}
              icon={<DashboardOutlined className="mr-2 text-blue-600" />}
              badge={{ text: "管理员工作台" }}
              compact={false}
            >
              {/* 统计卡片 */}
              <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                  <Card size="small" className="border-l-4 border-l-yellow-400">
                    <Statistic
                      title="待办履职事项"
                      value={statistics.pendingDutyItems}
                      prefix={<ClockCircleOutlined />}
                      valueStyle={{ color: '#faad14', fontSize: '20px' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Card size="small" className="border-l-4 border-l-green-400">
                    <Statistic
                      title="已完成事项"
                      value={statistics.completedDutyItems}
                      prefix={<CheckCircleOutlined />}
                      valueStyle={{ color: '#52c41a', fontSize: '20px' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Card size="small" className="border-l-4 border-l-red-400">
                    <Statistic
                      title="逾期事项"
                      value={statistics.overdueDutyItems}
                      prefix={<ExclamationCircleOutlined />}
                      valueStyle={{ color: '#ff4d4f', fontSize: '20px' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Card size="small" className="border-l-4 border-l-blue-400">
                    <Statistic
                      title="履职完成率"
                      value={statistics.totalDutyItems ? Math.round((statistics.completedDutyItems / statistics.totalDutyItems) * 100) : 0}
                      suffix="%"
                      prefix={<AuditOutlined />}
                      valueStyle={{ color: '#1890ff', fontSize: '20px' }}
                    />
                  </Card>
                </Col>
              </Row>

              {/* 其他统计信息 */}
              <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={8}>
                  <Card size="small" className="text-center">
                    <Statistic
                      title="参与会议"
                      value={statistics.totalMeetings}
                      prefix={<CalendarOutlined />}
                      valueStyle={{ fontSize: '18px' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card size="small" className="text-center">
                    <Statistic
                      title="教育学习"
                      value={statistics.totalEducationRecords}
                      prefix={<BookOutlined />}
                      valueStyle={{ fontSize: '18px' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card size="small" className="text-center">
                    <Statistic
                      title="巡视整改"
                      value={`${statistics.completedInspectionItems}/${statistics.totalInspectionItems}`}
                      prefix={<FileTextOutlined />}
                      valueStyle={{ fontSize: '18px' }}
                    />
                  </Card>
                </Col>
              </Row>

              {/* 我的待办事项 */}
              <Card 
                size="small"
                title="我的履职事项" 
                extra={
                  <Badge 
                    count={statistics.pendingDutyItems} 
                    style={{ backgroundColor: '#faad14' }}
                  />
                }
              >
                <List
                  dataSource={myDutyItems}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      style={{
                        background: isOverdue(item.dueDate, item.status) ? '#fff2f0' : '#fff',
                        marginBottom: 8,
                        padding: 12,
                        borderRadius: 6,
                        border: '1px solid #f0f0f0'
                      }}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '14px' }}>{item.title}</span>
                            <Tag color={getPriorityColor(item.priority)}>
                              {getPriorityText(item.priority)}优先级
                            </Tag>
                            <Tag color={getStatusColor(item.status)}>
                              {getStatusText(item.status)}
                            </Tag>
                            {isOverdue(item.dueDate, item.status) && (
                              <Tag color="red">已逾期</Tag>
                            )}
                          </div>
                        }
                        description={
                          <div>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 8, fontSize: '12px' }}>
                              {item.description}
                            </Text>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                截止: {item.dueDate}
                              </Text>
                              <div style={{ flex: 1, maxWidth: 120 }}>
                                <Progress 
                                  percent={item.progress} 
                                  size="small" 
                                  status={item.progress === 100 ? 'success' : 'normal'}
                                />
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  locale={{ emptyText: '暂无履职事项' }}
                />
              </Card>
            </ModuleContainer>
          </div>
        </section>
        
        {/* 功能模块 */}
        <section className="relative z-10 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ModuleContainer
              title="功能模块"
              description="提供完整的党建工作管理功能，助力提升工作效率"
              icon={<AppstoreOutlined className="mr-2 text-blue-600" />}
              badge={{ text: "智能工作台" }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {adminFunctionCards.map((card, index) => (
                  <DashboardCard
                    key={index}
                    card={card}
                    onClick={() => handleCardClick(card.id)}
                  />
                ))}
              </div>
            </ModuleContainer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 