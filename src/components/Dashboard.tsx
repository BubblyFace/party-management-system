import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, List, Tag, Progress, Typography, Badge } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BookOutlined,
  AuditOutlined
} from '@ant-design/icons';
import { DutyStorage, MeetingStorage, EducationStorage, InspectionStorage } from '../utils/storage';
import type { User, DutyItem, Statistics } from '../types';
import { Status, Priority } from '../types';

const { Title, Text } = Typography;

interface DashboardProps {
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
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
    loadStatistics();
    loadMyTasks();
  }, [currentUser]);

  const loadStatistics = () => {
    const dutyItems = DutyStorage.getAll();
    const meetings = MeetingStorage.getAll();
    const educationRecords = EducationStorage.getAll();
    const inspectionItems = InspectionStorage.getAll();

    // 根据当前用户过滤相关数据
    const myDuties = dutyItems.filter(item => item.assignedTo === currentUser.id);
    const myInspections = inspectionItems.filter(item => item.responsiblePerson === currentUser.id);

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

  const loadMyTasks = () => {
    const dutyItems = DutyStorage.getByAssignedTo(currentUser.id);
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

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>工作概览</Title>
        <Text type="secondary">
          欢迎您，{currentUser.name} | {currentUser.department}
        </Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="待办履职事项"
              value={statistics.pendingDutyItems}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已完成事项"
              value={statistics.completedDutyItems}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="逾期事项"
              value={statistics.overdueDutyItems}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="履职完成率"
              value={statistics.totalDutyItems ? Math.round((statistics.completedDutyItems / statistics.totalDutyItems) * 100) : 0}
              suffix="%"
              prefix={<AuditOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 其他统计信息 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="参与会议"
              value={statistics.totalMeetings}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="教育学习"
              value={statistics.totalEducationRecords}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="巡视整改"
              value={`${statistics.completedInspectionItems}/${statistics.totalInspectionItems}`}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 我的待办事项 */}
      <Card 
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
                padding: 16,
                borderRadius: 6,
                border: '1px solid #f0f0f0'
              }}
            >
              <List.Item.Meta
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{item.title}</span>
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
                    <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                      {item.description}
                    </Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <Text type="secondary">
                        截止日期: {item.dueDate}
                      </Text>
                      <div style={{ flex: 1, maxWidth: 200 }}>
                        <Text type="secondary" style={{ marginRight: 8 }}>
                          进度:
                        </Text>
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
    </div>
  );
};

export default Dashboard; 