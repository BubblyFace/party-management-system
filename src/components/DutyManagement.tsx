import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Progress, 
  Tag, 
  Space, 
  message,
  Popconfirm,
  Typography
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DutyStorage, UserStorage } from '../utils/storage';
import type { DutyItem, User } from '../types';
import { Priority, Status, UserRole } from '../types';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

interface DutyManagementProps {
  currentUser: User;
}

const DutyManagement: React.FC<DutyManagementProps> = ({ currentUser }) => {
  const [dutyItems, setDutyItems] = useState<DutyItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<DutyItem | null>(null);
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadDutyItems();
    loadUsers();
  }, []);

  const loadDutyItems = () => {
    const items = DutyStorage.getAll();
    setDutyItems(items);
  };

  const loadUsers = () => {
    const allUsers = UserStorage.getAll();
    // 只显示党委成员，供分配任务使用
    const members = allUsers.filter(user => user.role === UserRole.MEMBER);
    setUsers(members);
  };

  const showModal = (item?: DutyItem) => {
    setEditingItem(item || null);
    if (item) {
      form.setFieldsValue({
        ...item,
        dueDate: dayjs(item.dueDate)
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
      const dutyItem: DutyItem = {
        id: editingItem?.id || `duty_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: values.title,
        description: values.description,
        assignedTo: values.assignedTo,
        assignedBy: currentUser.id,
        priority: values.priority,
        status: values.status || Status.PENDING,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        progress: values.progress || 0,
        remarks: values.remarks,
        createdAt: editingItem?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingItem) {
        DutyStorage.update(dutyItem);
        message.success('履职事项更新成功');
      } else {
        DutyStorage.add(dutyItem);
        message.success('履职事项添加成功');
      }

      handleCancel();
      loadDutyItems();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const handleDelete = (id: string) => {
    DutyStorage.delete(id);
    message.success('履职事项删除成功');
    loadDutyItems();
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

  const columns = [
    {
      title: '事项标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: true,
    },
    {
      title: '分配给',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
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
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
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
      render: (_: unknown, record: DutyItem) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除这项履职事项吗？"
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
        title={
          <div>
            <Title level={3} style={{ margin: 0 }}>履职事项管理</Title>
          </div>
        }
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            添加履职事项
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={dutyItems}
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
        title={editingItem ? '编辑履职事项' : '添加履职事项'}
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
            status: Status.PENDING,
            progress: 0
          }}
        >
          <Form.Item
            name="title"
            label="事项标题"
            rules={[{ required: true, message: '请输入事项标题' }]}
          >
            <Input placeholder="请输入事项标题" />
          </Form.Item>

          <Form.Item
            name="description"
            label="事项描述"
            rules={[{ required: true, message: '请输入事项描述' }]}
          >
            <TextArea rows={3} placeholder="请输入事项描述" />
          </Form.Item>

          <Form.Item
            name="assignedTo"
            label="分配给"
            rules={[{ required: true, message: '请选择负责人' }]}
          >
            <Select placeholder="请选择负责人">
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
            name="progress"
            label="进度 (%)"
          >
            <Input type="number" min={0} max={100} placeholder="请输入进度" />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="截止日期"
            rules={[{ required: true, message: '请选择截止日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="remarks"
            label="备注"
          >
            <TextArea rows={2} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DutyManagement; 