// 用户角色类型
export enum UserRole {
  MEMBER = 'member', // 党委成员
  ADMIN = 'admin'    // 管理员
}

// 优先级类型
export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

// 状态类型
export enum Status {
  PENDING = 'pending',    // 待处理
  IN_PROGRESS = 'in_progress', // 进行中
  COMPLETED = 'completed', // 已完成
  OVERDUE = 'overdue'     // 已逾期
}

// 用户信息
export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: UserRole;
  phone: string;
  level?: 'province' | 'city' | 'county'; // 省市县级别
  createdAt: string;
  updatedAt: string;
}

// 履职事项
export interface DutyItem {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // 分配给的党委成员ID
  assignedBy: string; // 分配者ID
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  progress: number; // 进度百分比
  remarks?: string;
}

// 党委会议题
export interface MeetingTopic {
  id: string;
  title: string;
  description: string;
  meetingDate: string;
  createdBy: string;
  status: Status;
  documents?: string[]; // 相关文档
  participants: string[]; // 参与人员ID
  decisions?: string; // 会议决议
  createdAt: string;
  updatedAt: string;
}

// 集中教育学习台账
export interface EducationRecord {
  id: string;
  title: string;
  type: 'theory' | 'practice' | 'discussion' | 'exam'; // 理论学习、实践活动、讨论交流、考试测评
  content: string;
  organizer: string; // 组织者
  participants: string[]; // 参与人员
  studyDate: string;
  duration: number; // 学习时长（小时）
  location: string;
  materials?: string[]; // 学习材料
  summary?: string; // 学习总结
  createdAt: string;
  updatedAt: string;
}

// 巡视整改工作项
export interface InspectionItem {
  id: string;
  issueTitle: string; // 问题标题
  issueDescription: string; // 问题描述
  rectificationMeasures: string; // 整改措施
  responsiblePerson: string; // 责任人
  supervisorId: string; // 督办人ID
  priority: Priority;
  status: Status;
  dueDate: string;
  completionDate?: string;
  evidenceFiles?: string[]; // 整改证明材料
  progressReports: ProgressReport[]; // 进度报告
  createdAt: string;
  updatedAt: string;
}

// 进度报告
export interface ProgressReport {
  id: string;
  itemId: string; // 关联的工作项ID
  reportDate: string;
  progress: number; // 进度百分比
  description: string; // 进度描述
  reportedBy: string; // 汇报人ID
  attachments?: string[]; // 附件
}

// 统计数据
export interface Statistics {
  totalDutyItems: number;
  completedDutyItems: number;
  pendingDutyItems: number;
  overdueDutyItems: number;
  totalMeetings: number;
  totalEducationRecords: number;
  totalInspectionItems: number;
  completedInspectionItems: number;
} 