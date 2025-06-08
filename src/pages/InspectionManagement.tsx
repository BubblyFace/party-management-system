import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Tag, Space, message, Popconfirm, Typography, Select, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { InspectionStorage, UserStorage } from '../utils/storage';
import type { InspectionItem, User } from '../types';
import { Priority, Status, UserRole } from '../types';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const InspectionManagement: React.FC = () => {
  const [inspectionItems, setInspectionItems] = useState<InspectionItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<InspectionItem | null>(null);
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // 获取当前用户
    const user = UserStorage.getCurrentUser();
    setCurrentUser(user);
    
    loadInspectionItems();
    loadUsers();
  }, []);

  const loadInspectionItems = () => {
    const items = InspectionStorage.getAll();
    setInspectionItems(items);
  };

  const loadUsers = () => {
    const allUsers = UserStorage.getAll();
    const members = allUsers.filter(user => user.role === UserRole.MEMBER);
    setUsers(members);
  };

  const showModal = (item?: InspectionItem) => {
    setEditingItem(item || null);
    if (item) {
      form.setFieldsValue({
        ...item,
        dueDate: dayjs(item.dueDate),
        completionDate: item.completionDate ? dayjs(item.completionDate) : undefined
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      message.error('用户信息获取失败，请重新登录');
      return;
    }

    try {
      const values = await form.validateFields();
      const inspectionItem: InspectionItem = {
        id: editingItem?.id || `inspection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        issueTitle: values.issueTitle,
        issueDescription: values.issueDescription,
        rectificationMeasures: values.rectificationMeasures,
        responsiblePerson: values.responsiblePerson,
        supervisorId: currentUser.id,
        priority: values.priority,
        status: values.status || Status.PENDING,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        completionDate: values.completionDate ? values.completionDate.format('YYYY-MM-DD') : undefined,
        progressReports: editingItem?.progressReports || [],
        createdAt: editingItem?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingItem) {
        InspectionStorage.update(inspectionItem);
        message.success('巡视整改项目更新成功');
      } else {
        InspectionStorage.add(inspectionItem);
        message.success('巡视整改项目添加成功');
      }

      handleCancel();
      loadInspectionItems();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const handleDelete = (id: string) => {
    InspectionStorage.delete(id);
    message.success('巡视整改项目删除成功');
    loadInspectionItems();
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

  const getUserName = (userId: string) => {
    const user = UserStorage.getById(userId);
    return user?.name || '未知用户';
  };

  const getProgress = (item: InspectionItem) => {
    if (item.status === Status.COMPLETED) return 100;
    if (item.progressReports.length === 0) return 0;
    
    const latestReport = item.progressReports[item.progressReports.length - 1];
    return latestReport.progress;
  };

  const columns = [
    {
      title: '问题标题',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      width: 200,
    },
    {
      title: '问题描述',
      dataIndex: 'issueDescription',
      key: 'issueDescription',
      width: 250,
      ellipsis: true,
    },
    {
      title: '责任人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      width: 120,
      render: (userId: string) => getUserName(userId),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: Priority) => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityText(priority)}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: Status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '进度',
      key: 'progress',
      width: 120,
      render: (_: unknown, record: InspectionItem) => {
        const progress = getProgress(record);
        return <Progress percent={progress} size="small" />;
      },
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: InspectionItem) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除这个巡视整改项目吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: 'transparent', minHeight: '100%' }}>
      <Card
        title={<Title level={3} style={{ margin: 0 }}>巡视整改管理</Title>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            添加整改项目
          </Button>
        }
        style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <Table
          columns={columns}
          dataSource={inspectionItems}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={editingItem ? '编辑整改项目' : '添加整改项目'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            priority: Priority.MEDIUM,
            status: Status.PENDING
          }}
        >
          <Form.Item
            name="issueTitle"
            label="问题标题"
            rules={[{ required: true, message: '请输入问题标题' }]}
          >
            <Input placeholder="请输入问题标题" />
          </Form.Item>

          <Form.Item
            name="issueDescription"
            label="问题描述"
            rules={[{ required: true, message: '请输入问题描述' }]}
          >
            <TextArea rows={3} placeholder="请输入问题描述" />
          </Form.Item>

          <Form.Item
            name="rectificationMeasures"
            label="整改措施"
            rules={[{ required: true, message: '请输入整改措施' }]}
          >
            <TextArea rows={3} placeholder="请输入整改措施" />
          </Form.Item>

          <Form.Item
            name="responsiblePerson"
            label="责任人"
            rules={[{ required: true, message: '请选择责任人' }]}
          >
            <Select placeholder="请选择责任人">
              {users.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.name} - {user.department}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select>
              <Option value={Priority.HIGH}>高优先级</Option>
              <Option value={Priority.MEDIUM}>中优先级</Option>
              <Option value={Priority.LOW}>低优先级</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
          >
            <Select>
              <Option value={Status.PENDING}>待处理</Option>
              <Option value={Status.IN_PROGRESS}>进行中</Option>
              <Option value={Status.COMPLETED}>已完成</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="截止日期"
            rules={[{ required: true, message: '请选择截止日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="completionDate"
            label="完成日期"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InspectionManagement; 