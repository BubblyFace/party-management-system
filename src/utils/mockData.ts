import type { User, DutyItem, MeetingTopic, EducationRecord, InspectionItem } from '../types';
import { UserRole, Priority, Status } from '../types';
import { UserStorage, DutyStorage, MeetingStorage, EducationStorage, InspectionStorage } from './storage';

// 生成唯一ID
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// 创建模拟用户数据
const createMockUsers = (): User[] => [
  {
    id: 'user_1',
    username: 'zhangshj',
    password: '123456',
    name: '张书记',
    email: 'zhang@party.gov.cn',
    department: '省委组织部',
    position: '党委书记',
    role: UserRole.MEMBER,
    phone: '010-12345001',
    level: 'province',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user_2',
    username: 'lizhuren',
    password: '123456',
    name: '李主任',
    email: 'li@party.gov.cn',
    department: '市委宣传部',
    position: '宣传部主任',
    role: UserRole.MEMBER,
    phone: '010-12345002',
    level: 'city',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user_3',
    username: 'wangxz',
    password: '123456',
    name: '王县长',
    email: 'wang@party.gov.cn',
    department: '县委办公室',
    position: '县委书记',
    role: UserRole.MEMBER,
    phone: '010-12345003',
    level: 'county',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'admin_1',
    username: 'admin_prov',
    password: 'admin123',
    name: '管理员（省级）',
    email: 'admin1@party.gov.cn',
    department: '省委办公厅',
    position: '系统管理员',
    role: UserRole.ADMIN,
    phone: '010-12345011',
    level: 'province',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'admin_2',
    username: 'admin_city',
    password: 'admin123',
    name: '管理员（市级）',
    email: 'admin2@party.gov.cn',
    department: '市委办公室',
    position: '系统管理员',
    role: UserRole.ADMIN,
    phone: '010-12345012',
    level: 'city',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'admin_3',
    username: 'admin_county',
    password: 'admin123',
    name: '管理员（县级）',
    email: 'admin3@party.gov.cn',
    department: '县委办公室',
    position: '系统管理员',
    role: UserRole.ADMIN,
    phone: '010-12345013',
    level: 'county',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

// 创建模拟履职事项数据
const createMockDutyItems = (): DutyItem[] => [
  {
    id: generateId(),
    title: '深入学习党的二十大精神',
    description: '组织开展党的二十大精神专题学习讨论，确保学深悟透',
    assignedTo: 'user_1',
    assignedBy: 'admin_1',
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
    dueDate: '2024-02-15',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10',
    progress: 60,
    remarks: '已完成理论学习阶段，正在组织讨论'
  },
  {
    id: generateId(),
    title: '基层党组织建设调研',
    description: '深入基层开展党组织建设情况调研，形成调研报告',
    assignedTo: 'user_2',
    assignedBy: 'admin_2',
    priority: Priority.MEDIUM,
    status: Status.PENDING,
    dueDate: '2024-02-20',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    progress: 0
  },
  {
    id: generateId(),
    title: '党风廉政建设责任制落实',
    description: '检查各部门党风廉政建设责任制落实情况',
    assignedTo: 'user_3',
    assignedBy: 'admin_3',
    priority: Priority.HIGH,
    status: Status.COMPLETED,
    dueDate: '2024-01-31',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-30',
    progress: 100,
    remarks: '已完成检查并形成报告'
  }
];

// 创建模拟会议台账数据
const createMockMeetingTopics = (): MeetingTopic[] => [
  {
    id: generateId(),
    title: '2024年第一次党委会',
    description: '讨论年度工作计划及重点任务安排',
    meetingDate: '2024-01-15',
    createdBy: 'admin_1',
    status: Status.COMPLETED,
    documents: ['年度工作计划.pdf', '重点任务清单.docx'],
    participants: ['user_1', 'user_2', 'user_3'],
    decisions: '通过2024年度工作计划，明确各项重点任务责任分工',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-16'
  },
  {
    id: generateId(),
    title: '党建工作专题会议',
    description: '研究部署党建工作重点任务',
    meetingDate: '2024-02-01',
    createdBy: 'admin_2',
    status: Status.PENDING,
    participants: ['user_1', 'user_2'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
];

// 创建模拟教育学习台账数据
const createMockEducationRecords = (): EducationRecord[] => [
  {
    id: generateId(),
    title: '学习习近平新时代中国特色社会主义思想',
    type: 'theory',
    content: '深入学习《习近平新时代中国特色社会主义思想学习纲要》',
    organizer: 'admin_1',
    participants: ['user_1', 'user_2', 'user_3'],
    studyDate: '2024-01-20',
    duration: 2,
    location: '会议室A',
    materials: ['学习纲要.pdf', '学习心得模板.docx'],
    summary: '全体参与人员深入学习，撰写心得体会',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-21'
  },
  {
    id: generateId(),
    title: '党史学习教育实践活动',
    type: 'practice',
    content: '参观革命纪念馆，重温入党誓词',
    organizer: 'admin_2',
    participants: ['user_1', 'user_2'],
    studyDate: '2024-01-25',
    duration: 4,
    location: '革命纪念馆',
    summary: '通过实地参观学习，进一步坚定理想信念',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-26'
  }
];

// 创建模拟巡视整改项目数据
const createMockInspectionItems = (): InspectionItem[] => [
  {
    id: generateId(),
    issueTitle: '财务管理制度不够完善',
    issueDescription: '发现部分财务流程不够规范，缺乏有效监督机制',
    rectificationMeasures: '1. 完善财务管理制度；2. 建立内部审计机制；3. 加强财务人员培训',
    responsiblePerson: 'user_1',
    supervisorId: 'admin_1',
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
    dueDate: '2024-03-01',
    progressReports: [
      {
        id: generateId(),
        itemId: '',
        reportDate: '2024-01-20',
        progress: 40,
        description: '已完成制度修订，正在组织培训',
        reportedBy: 'user_1'
      }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20'
  },
  {
    id: generateId(),
    issueTitle: '干部选拔任用程序有待规范',
    issueDescription: '在干部选拔任用过程中，部分程序执行不够严格',
    rectificationMeasures: '1. 严格按照干部选拔任用条例执行；2. 建立全程记录制度；3. 加强监督检查',
    responsiblePerson: 'user_2',
    supervisorId: 'admin_2',
    priority: Priority.MEDIUM,
    status: Status.PENDING,
    dueDate: '2024-02-28',
    progressReports: [],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
];

// 初始化系统数据
export const initializeSystemData = () => {
  // 检查是否已经初始化过数据
  const existingUsers = UserStorage.getAll();
  if (existingUsers.length > 0) {
    return; // 数据已存在，不需要重新初始化
  }

  // 初始化用户数据
  const users = createMockUsers();
  users.forEach(user => UserStorage.add(user));

  // 初始化履职事项数据
  const dutyItems = createMockDutyItems();
  dutyItems.forEach(item => DutyStorage.add(item));

  // 初始化会议台账数据
  const meetings = createMockMeetingTopics();
  meetings.forEach(meeting => MeetingStorage.add(meeting));

  // 初始化教育学习台账数据
  const educationRecords = createMockEducationRecords();
  educationRecords.forEach(record => EducationStorage.add(record));

  // 初始化巡视整改数据
  const inspectionItems = createMockInspectionItems();
  inspectionItems.forEach(item => {
    // 为进度报告设置正确的itemId
    item.progressReports.forEach(report => {
      report.itemId = item.id;
    });
    InspectionStorage.add(item);
  });

  console.log('系统数据初始化完成');
};

// 重置系统数据
export const resetSystemData = () => {
  localStorage.clear();
  initializeSystemData();
  console.log('系统数据已重置');
}; 