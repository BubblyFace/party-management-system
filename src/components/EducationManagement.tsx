import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Tag, Space, message, Popconfirm, Typography, Select, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { EducationStorage, UserStorage } from '../utils/storage';
import type { EducationRecord, User } from '../types';
import { UserRole } from '../types';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

interface EducationManagementProps {
  currentUser: User;
}

const EducationManagement: React.FC<EducationManagementProps> = ({ currentUser }) => {
  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationRecord | null>(null);
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadEducationRecords();
    loadUsers();
  }, []);

  const loadEducationRecords = () => {
    const items = EducationStorage.getAll();
    setEducationRecords(items);
  };

  const loadUsers = () => {
    const allUsers = UserStorage.getAll();
    const members = allUsers.filter(user => user.role === UserRole.MEMBER);
    setUsers(members);
  };

  const showModal = (item?: EducationRecord) => {
    setEditingItem(item || null);
    if (item) {
      form.setFieldsValue({
        ...item,
        studyDate: dayjs(item.studyDate),
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
    try {
      const values = await form.validateFields();
      const educationRecord: EducationRecord = {
        id: editingItem?.id || `education_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: values.title,
        type: values.type,
        content: values.content,
        organizer: currentUser.id,
        participants: values.participants || [],
        studyDate: values.studyDate.format('YYYY-MM-DD'),
        duration: values.duration,
        location: values.location,
        summary: values.summary,
        createdAt: editingItem?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingItem) {
        EducationStorage.update(educationRecord);
        message.success('教育学习台账更新成功');
      } else {
        EducationStorage.add(educationRecord);
        message.success('教育学习台账添加成功');
      }

      handleCancel();
      loadEducationRecords();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const handleDelete = (id: string) => {
    EducationStorage.delete(id);
    message.success('教育学习台账删除成功');
    loadEducationRecords();
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'theory': return '理论学习';
      case 'practice': return '实践活动';
      case 'discussion': return '讨论交流';
      case 'exam': return '考试测评';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'blue';
      case 'practice': return 'green';
      case 'discussion': return 'orange';
      case 'exam': return 'purple';
      default: return 'default';
    }
  };

  const getUserName = (userId: string) => {
    const user = UserStorage.getById(userId);
    return user?.name || '未知用户';
  };

  const columns = [
    {
      title: '学习主题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '学习类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {getTypeText(type)}
        </Tag>
      ),
    },
    {
      title: '学习日期',
      dataIndex: 'studyDate',
      key: 'studyDate',
      width: 120,
    },
    {
      title: '学习时长',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      render: (duration: number) => `${duration}小时`,
    },
    {
      title: '地点',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: '参与人员',
      dataIndex: 'participants',
      key: 'participants',
      width: 200,
      render: (participants: string[]) => (
        <div>
          {participants.slice(0, 3).map(userId => getUserName(userId)).join(', ')}
          {participants.length > 3 && '...'}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: EducationRecord) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除这个教育学习台账吗？"
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
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        title={<Title level={3} style={{ margin: 0 }}>教育学习台账管理</Title>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            添加学习记录
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={educationRecords}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingItem ? '编辑学习记录' : '添加学习记录'}
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
            type: 'theory',
            duration: 2
          }}
        >
          <Form.Item
            name="title"
            label="学习主题"
            rules={[{ required: true, message: '请输入学习主题' }]}
          >
            <Input placeholder="请输入学习主题" />
          </Form.Item>

          <Form.Item
            name="type"
            label="学习类型"
            rules={[{ required: true, message: '请选择学习类型' }]}
          >
            <Select>
              <Option value="theory">理论学习</Option>
              <Option value="practice">实践活动</Option>
              <Option value="discussion">讨论交流</Option>
              <Option value="exam">考试测评</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="学习内容"
            rules={[{ required: true, message: '请输入学习内容' }]}
          >
            <TextArea rows={3} placeholder="请输入学习内容" />
          </Form.Item>

          <Form.Item
            name="studyDate"
            label="学习日期"
            rules={[{ required: true, message: '请选择学习日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="学习时长（小时）"
            rules={[{ required: true, message: '请输入学习时长' }]}
          >
            <InputNumber min={0.5} step={0.5} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="location"
            label="学习地点"
            rules={[{ required: true, message: '请输入学习地点' }]}
          >
            <Input placeholder="请输入学习地点" />
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
            name="summary"
            label="学习总结"
          >
            <TextArea rows={3} placeholder="请输入学习总结" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EducationManagement; 