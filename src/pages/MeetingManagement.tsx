import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Tag, Space, message, Popconfirm, Typography, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MeetingStorage, UserStorage } from '../utils/storage';
import type { MeetingTopic, User } from '../types';
import { Status, UserRole } from '../types';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const MeetingManagement: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [meetings, setMeetings] = useState<MeetingTopic[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MeetingTopic | null>(null);
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const user = UserStorage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadMeetings();
      loadUsers();
    }
  }, []);

  const loadMeetings = () => {
    const items = MeetingStorage.getAll();
    setMeetings(items);
  };

  const loadUsers = () => {
    const allUsers = UserStorage.getAll();
    const members = allUsers.filter(user => user.role === UserRole.MEMBER);
    setUsers(members);
  };

  const showModal = (item?: MeetingTopic) => {
    setEditingItem(item || null);
    if (item) {
      form.setFieldsValue({
        ...item,
        meetingDate: dayjs(item.meetingDate),
        participants: item.participants
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
    if (!currentUser) return;
    
    try {
      const values = await form.validateFields();
      const meetingTopic: MeetingTopic = {
        id: editingItem?.id || `meeting_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: values.title,
        description: values.description,
        meetingDate: values.meetingDate.format('YYYY-MM-DD'),
        createdBy: currentUser.id,
        status: values.status || Status.PENDING,
        participants: values.participants || [],
        decisions: values.decisions,
        createdAt: editingItem?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingItem) {
        MeetingStorage.update(meetingTopic);
        message.success('会议台账更新成功');
      } else {
        MeetingStorage.add(meetingTopic);
        message.success('会议台账添加成功');
      }

      handleCancel();
      loadMeetings();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const handleDelete = (id: string) => {
    MeetingStorage.delete(id);
    message.success('会议台账删除成功');
    loadMeetings();
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.COMPLETED: return 'success';
      case Status.PENDING: return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case Status.COMPLETED: return '已完成';
      case Status.PENDING: return '待召开';
      default: return status;
    }
  };

  const getUserName = (userId: string) => {
    const user = UserStorage.getById(userId);
    return user?.name || '未知用户';
  };

  const columns = [
    {
      title: '会议主题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '会议描述',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: true,
    },
    {
      title: '会议日期',
      dataIndex: 'meetingDate',
      key: 'meetingDate',
      width: 120,
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
      title: '参与人员',
      dataIndex: 'participants',
      key: 'participants',
      width: 200,
      render: (participants: string[]) => (
        <div>
          {participants.map(userId => getUserName(userId)).join(', ')}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: MeetingTopic) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除这个会议台账吗？"
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
        title={<Title level={3} style={{ margin: 0 }}>会议台账管理</Title>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            添加会议台账
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
          dataSource={meetings}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingItem ? '编辑会议台账' : '添加会议台账'}
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
            status: Status.PENDING
          }}
        >
          <Form.Item
            name="title"
            label="会议主题"
            rules={[{ required: true, message: '请输入会议主题' }]}
          >
            <Input placeholder="请输入会议主题" />
          </Form.Item>

          <Form.Item
            name="description"
            label="会议描述"
            rules={[{ required: true, message: '请输入会议描述' }]}
          >
            <TextArea rows={3} placeholder="请输入会议描述" />
          </Form.Item>

          <Form.Item
            name="meetingDate"
            label="会议日期"
            rules={[{ required: true, message: '请选择会议日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="participants"
            label="参与人员"
          >
            <Select mode="multiple" placeholder="请选择参与人员">
              {users.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.name} - {user.department}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
          >
            <Select>
              <Option value={Status.PENDING}>待召开</Option>
              <Option value={Status.COMPLETED}>已完成</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="decisions"
            label="会议决议"
          >
            <TextArea rows={3} placeholder="请输入会议决议" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MeetingManagement; 