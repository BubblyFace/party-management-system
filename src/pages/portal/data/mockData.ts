import type { 
  DashboardCard, 
  StatItem, 
  DashboardData,
  CentralInspectionItem,
  GroupInspectionItem,
  EightRegulationsStudyItem,
  PartyEducationItem,
  LongTermMechanismItem,
  PartyCommitteeItem,
  TheoryStudyGroupItem,
  CompanyOperationItem,
  PerformanceTrendItem,
  DepartmentItem,
  RegionalCentralInspectionItem,
  RegionalGroupInspectionItem,
  RegionalEightRegulationsItem,
  RegionalPartyEducationItem,
  RegionalLongTermMechanismItem,
  RegionalPartyCommitteeItem,
  RegionalTheoryStudyItem,
  OrganizationDashboardData
} from '../types';

export const dashboardCards: DashboardCard[] = [
  {
    id: 1,
    title: '工作概览',
    description: '查看整体工作状态、待办事项和统计数据',
    icon: '📊',
    value: '12',
    trend: '+5%',
    color: 'blue',
    path: '/dashboard'
  },
  {
    id: 2,
    title: '履职事项管理',
    description: '管理和跟踪党委履职工作事项',
    icon: '📋',
    value: '8',
    trend: '+2',
    color: 'green',
    path: '/duty'
  },
  {
    id: 3,
    title: '会议台账管理',
    description: '管理党委会议记录和台账',
    icon: '🏛️',
    value: '15',
    color: 'slate',
    path: '/meeting'
  },
  {
    id: 4,
    title: '教育学习管理',
    description: '管理党员教育学习活动和记录',
    icon: '📚',
    value: '24',
    trend: '+8',
    color: 'orange',
    path: '/education'
  },
  {
    id: 5,
    title: '巡视整改管理',
    description: '管理巡视整改项目和进度跟踪',
    icon: '🔍',
    value: '6',
    trend: '-1',
    color: 'red',
    path: '/inspection'
  },
  {
    id: 6,
    title: '强化制度建设和制度执行',
    description: '深化制度巡察整改，建立健全长效机制',
    icon: '🏛️',
    value: '18',
    color: 'slate'
  },
  {
    id: 7,
    title: '监督管理',
    description: '加强对"一把手"和领导班子监督管理',
    icon: '👥',
    value: '9',
    color: 'blue'
  },
  {
    id: 8,
    title: '党建工作',
    description: '组织开展党组织书记抓基层党建工作述职评议',
    icon: '🏆',
    value: '32',
    trend: '+12',
    color: 'green'
  },
  {
    id: 9,
    title: '贯彻执行民主集中制',
    description: '严格执行民主集中制各项规定要求',
    icon: '⚖️',
    value: '7',
    color: 'slate'
  },
  {
    id: 10,
    title: '深化巡视巡察整改',
    description: '持续深化各级巡视巡察整改工作落实',
    icon: '🔍',
    value: '11',
    trend: '+3',
    color: 'orange'
  },
  {
    id: 11,
    title: '落实廉洁风险防控机制',
    description: '建立健全廉洁风险防控体系建设',
    icon: '🛡️',
    value: '5',
    color: 'blue'
  },
  {
    id: 12,
    title: '推动大督办体系有效运转',
    description: '重点领域突出问题专项治理督查督办',
    icon: '⚡',
    value: '14',
    trend: '+6',
    color: 'green'
  }
];

export const centerStats: StatItem[] = [
  { label: '近期学习任务', value: 2, unit: '项', color: 'blue' },
  { label: '已延期', value: 2, unit: '项', color: 'red' },
  { label: '问题清单', value: 8, unit: '项', color: 'blue' },
  { label: '近期需反馈', value: 2, unit: '项', color: 'blue' },
  { label: '已延期', value: 3, unit: '项', color: 'red' },
  { label: '派发', value: 280, unit: '单', color: 'blue' },
  { label: '确认', value: 128, unit: '单', color: 'blue' },
  { label: '风险', value: 2, unit: '项', color: 'red' },
  { label: '预警', value: 2, unit: '项', color: 'red' },
  { label: '离目标相差', value: '5%', color: 'blue' },
  { label: '二季度经营收入', value: '6.7%', trend: 1, color: 'green' },
  { label: '下降', value: '13.5%', trend: -1, color: 'red' }
];

// 数据驾驶舱mock数据 - 更新为党建工作数据
export const centralInspectionData: CentralInspectionItem[] = [
  { name: '政治生态建设', completed: 8, total: 12, completionRate: 67, color: '#1890FF' },
  { name: '党风廉政建设', completed: 15, total: 18, completionRate: 83, color: '#52C41A' },
  { name: '选人用人工作', completed: 6, total: 8, completionRate: 75, color: '#FA8C16' },
  { name: '落实中央决策', completed: 12, total: 15, completionRate: 80, color: '#722ED1' }
];

export const groupInspectionData: GroupInspectionItem[] = [
  { name: '制度建设', completed: 20, total: 25, completionRate: 80, color: '#1890FF' },
  { name: '监督管理', completed: 18, total: 22, completionRate: 82, color: '#52C41A' },
  { name: '风险防控', completed: 14, total: 18, completionRate: 78, color: '#FA8C16' },
  { name: '责任落实', completed: 16, total: 20, completionRate: 80, color: '#722ED1' }
];

export const eightRegulationsStudyData: EightRegulationsStudyItem = {
  name: '八项规定精神学习',
  completed: 24,
  pending: 6,
  completionRate: 80
};

export const partyEducationData: PartyEducationItem = {
  name: '党内集中教育',
  completed: 18,
  pending: 4,
  completionRate: 82
};

export const longTermMechanismData: LongTermMechanismItem[] = [
  { name: '第一议题学习', completed: 32, pending: 8, color: '#1890FF' },
  { name: '制度执行', completed: 28, pending: 12, color: '#52C41A' },
  { name: '监督检查', completed: 22, pending: 6, color: '#FA8C16' },
  { name: '整改落实', completed: 30, pending: 10, color: '#722ED1' }
];

export const partyCommitteeData: PartyCommitteeItem[] = [
  { name: '重大事项决策', value: 12, color: '#1890FF' },
  { name: '党委会议题', value: 26, color: '#52C41A' },
  { name: '专题研究', value: 8, color: '#FA8C16' },
  { name: '集体决策', value: 15, color: '#722ED1' }
];

export const theoryStudyGroupData: TheoryStudyGroupItem = {
  currentMonthSessions: 4,
  yearlyTotalSessions: 48,
  targetSessions: 52,
  completionRate: 92
};

export const companyOperationData: CompanyOperationItem[] = [
  { category: '派发任务', value: 280, color: '#1890FF' },
  { category: '确认完成', value: 128, color: '#52C41A' },
  { category: '待处理', value: 152, color: '#FA8C16' },
  { category: '超期项目', value: 3, color: '#FF4D4F' }
];

export const performanceTrendData: PerformanceTrendItem[] = [
  { period: 'Q1', income: 6.2, cost: 12.8, profit: 7.5 },
  { period: 'Q2', income: 6.7, cost: 13.5, profit: 8.2 },
  { period: 'Q3', income: 7.1, cost: 13.2, profit: 8.8 },
  { period: 'Q4', income: 7.5, cost: 12.9, profit: 9.1 }
];

export const departmentData: DepartmentItem[] = [
  { name: '组织部', value: 12, color: '#1890FF' },
  { name: '宣传部', value: 10, color: '#52C41A' },
  { name: '纪检部', value: 8, color: '#FA8C16' },
  { name: '统战部', value: 6, color: '#722ED1' },
  { name: '青工部', value: 15, color: '#13C2C2' },
  { name: '工会', value: 20, color: '#F759AB' },
  { name: '团委', value: 18, color: '#36CFC9' },
  { name: '妇联', value: 14, color: '#FFC53D' }
];

// 组织仪表板 - 11个区域数据
export const regionalCentralInspectionData: RegionalCentralInspectionItem[] = [
  { region: '杭州', completionRate: 88, completed: 22, total: 25 },
  { region: '宁波', completionRate: 85, completed: 17, total: 20 },
  { region: '温州', completionRate: 92, completed: 23, total: 25 },
  { region: '嘉兴', completionRate: 78, completed: 14, total: 18 },
  { region: '湖州', completionRate: 83, completed: 15, total: 18 },
  { region: '绍兴', completionRate: 79, completed: 19, total: 24 },
  { region: '金华', completionRate: 76, completed: 13, total: 17 },
  { region: '衢州', completionRate: 81, completed: 13, total: 16 },
  { region: '丽水', completionRate: 74, completed: 11, total: 15 },
  { region: '台州', completionRate: 86, completed: 18, total: 21 },
  { region: '舟山', completionRate: 89, completed: 16, total: 18 }
];

export const regionalGroupInspectionData: RegionalGroupInspectionItem[] = [
  { region: '杭州', completionRate: 91, completed: 32, total: 35 },
  { region: '宁波', completionRate: 87, completed: 26, total: 30 },
  { region: '温州', completionRate: 89, completed: 31, total: 35 },
  { region: '嘉兴', completionRate: 82, completed: 20, total: 24 },
  { region: '湖州', completionRate: 85, completed: 22, total: 26 },
  { region: '绍兴', completionRate: 84, completed: 27, total: 32 },
  { region: '金华', completionRate: 78, completed: 18, total: 23 },
  { region: '衢州', completionRate: 80, completed: 16, total: 20 },
  { region: '丽水', completionRate: 76, completed: 15, total: 20 },
  { region: '台州', completionRate: 88, completed: 22, total: 25 },
  { region: '舟山', completionRate: 93, completed: 21, total: 23 }
];

export const regionalEightRegulationsData: RegionalEightRegulationsItem[] = [
  { region: '杭州', completionRate: 94, completed: 47, pending: 3 },
  { region: '宁波', completionRate: 89, completed: 40, pending: 5 },
  { region: '温州', completionRate: 91, completed: 43, pending: 4 },
  { region: '嘉兴', completionRate: 85, completed: 34, pending: 6 },
  { region: '湖州', completionRate: 87, completed: 35, pending: 5 },
  { region: '绍兴', completionRate: 88, completed: 37, pending: 5 },
  { region: '金华', completionRate: 83, completed: 30, pending: 6 },
  { region: '衢州', completionRate: 86, completed: 25, pending: 4 },
  { region: '丽水', completionRate: 81, completed: 22, pending: 5 },
  { region: '台州', completionRate: 90, completed: 36, pending: 4 },
  { region: '舟山', completionRate: 92, completed: 23, pending: 2 }
];

export const regionalPartyEducationData: RegionalPartyEducationItem[] = [
  { region: '杭州', completionRate: 89, completed: 32, pending: 4 },
  { region: '宁波', completionRate: 85, completed: 28, pending: 5 },
  { region: '温州', completionRate: 87, completed: 30, pending: 4 },
  { region: '嘉兴', completionRate: 81, completed: 22, pending: 5 },
  { region: '湖州', completionRate: 83, completed: 24, pending: 5 },
  { region: '绍兴', completionRate: 84, completed: 26, pending: 5 },
  { region: '金华', completionRate: 79, completed: 19, pending: 5 },
  { region: '衢州', completionRate: 82, completed: 18, pending: 4 },
  { region: '丽水', completionRate: 77, completed: 17, pending: 5 },
  { region: '台州', completionRate: 86, completed: 25, pending: 4 },
  { region: '舟山', completionRate: 88, completed: 22, pending: 3 }
];

export const regionalLongTermMechanismData: RegionalLongTermMechanismItem[] = [
  { region: '杭州', firstTopicStudy: { completed: 38, pending: 5 }, systemExecution: { completed: 32, pending: 8 }, supervisionCheck: { completed: 28, pending: 4 }, rectificationImplementation: { completed: 41, pending: 6 } },
  { region: '宁波', firstTopicStudy: { completed: 32, pending: 6 }, systemExecution: { completed: 28, pending: 9 }, supervisionCheck: { completed: 24, pending: 5 }, rectificationImplementation: { completed: 35, pending: 7 } },
  { region: '温州', firstTopicStudy: { completed: 35, pending: 5 }, systemExecution: { completed: 30, pending: 8 }, supervisionCheck: { completed: 26, pending: 4 }, rectificationImplementation: { completed: 38, pending: 6 } },
  { region: '嘉兴', firstTopicStudy: { completed: 28, pending: 7 }, systemExecution: { completed: 24, pending: 10 }, supervisionCheck: { completed: 20, pending: 6 }, rectificationImplementation: { completed: 31, pending: 8 } },
  { region: '湖州', firstTopicStudy: { completed: 30, pending: 6 }, systemExecution: { completed: 26, pending: 9 }, supervisionCheck: { completed: 22, pending: 5 }, rectificationImplementation: { completed: 33, pending: 7 } },
  { region: '绍兴', firstTopicStudy: { completed: 33, pending: 6 }, systemExecution: { completed: 29, pending: 9 }, supervisionCheck: { completed: 25, pending: 5 }, rectificationImplementation: { completed: 36, pending: 7 } },
  { region: '金华', firstTopicStudy: { completed: 25, pending: 8 }, systemExecution: { completed: 22, pending: 11 }, supervisionCheck: { completed: 18, pending: 7 }, rectificationImplementation: { completed: 28, pending: 9 } },
  { region: '衢州', firstTopicStudy: { completed: 27, pending: 7 }, systemExecution: { completed: 23, pending: 10 }, supervisionCheck: { completed: 19, pending: 6 }, rectificationImplementation: { completed: 30, pending: 8 } },
  { region: '丽水', firstTopicStudy: { completed: 23, pending: 9 }, systemExecution: { completed: 20, pending: 12 }, supervisionCheck: { completed: 16, pending: 8 }, rectificationImplementation: { completed: 26, pending: 10 } },
  { region: '台州', firstTopicStudy: { completed: 31, pending: 6 }, systemExecution: { completed: 27, pending: 9 }, supervisionCheck: { completed: 23, pending: 5 }, rectificationImplementation: { completed: 34, pending: 7 } },
  { region: '舟山', firstTopicStudy: { completed: 29, pending: 5 }, systemExecution: { completed: 25, pending: 7 }, supervisionCheck: { completed: 21, pending: 4 }, rectificationImplementation: { completed: 32, pending: 6 } }
];

export const regionalPartyCommitteeData: RegionalPartyCommitteeItem[] = [
  { region: '杭州', majorDecisions: 15, meetingTopics: 48, specialResearch: 12, collectiveDecisions: 28 },
  { region: '宁波', majorDecisions: 12, meetingTopics: 42, specialResearch: 10, collectiveDecisions: 24 },
  { region: '温州', majorDecisions: 13, meetingTopics: 45, specialResearch: 11, collectiveDecisions: 26 },
  { region: '嘉兴', majorDecisions: 9, meetingTopics: 35, specialResearch: 8, collectiveDecisions: 20 },
  { region: '湖州', majorDecisions: 10, meetingTopics: 38, specialResearch: 9, collectiveDecisions: 22 },
  { region: '绍兴', majorDecisions: 11, meetingTopics: 40, specialResearch: 10, collectiveDecisions: 23 },
  { region: '金华', majorDecisions: 8, meetingTopics: 32, specialResearch: 7, collectiveDecisions: 18 },
  { region: '衢州', majorDecisions: 7, meetingTopics: 28, specialResearch: 6, collectiveDecisions: 16 },
  { region: '丽水', majorDecisions: 6, meetingTopics: 25, specialResearch: 5, collectiveDecisions: 14 },
  { region: '台州', majorDecisions: 11, meetingTopics: 39, specialResearch: 9, collectiveDecisions: 22 },
  { region: '舟山', majorDecisions: 8, meetingTopics: 30, specialResearch: 7, collectiveDecisions: 17 }
];

export const regionalTheoryStudyData: RegionalTheoryStudyItem[] = [
  { region: '杭州', currentMonthSessions: 4, yearlyTotalSessions: 49, targetSessions: 52, completionRate: 94 },
  { region: '宁波', currentMonthSessions: 4, yearlyTotalSessions: 47, targetSessions: 52, completionRate: 90 },
  { region: '温州', currentMonthSessions: 4, yearlyTotalSessions: 48, targetSessions: 52, completionRate: 92 },
  { region: '嘉兴', currentMonthSessions: 3, yearlyTotalSessions: 44, targetSessions: 52, completionRate: 85 },
  { region: '湖州', currentMonthSessions: 3, yearlyTotalSessions: 45, targetSessions: 52, completionRate: 87 },
  { region: '绍兴', currentMonthSessions: 4, yearlyTotalSessions: 46, targetSessions: 52, completionRate: 88 },
  { region: '金华', currentMonthSessions: 3, yearlyTotalSessions: 42, targetSessions: 52, completionRate: 81 },
  { region: '衢州', currentMonthSessions: 3, yearlyTotalSessions: 43, targetSessions: 52, completionRate: 83 },
  { region: '丽水', currentMonthSessions: 3, yearlyTotalSessions: 41, targetSessions: 52, completionRate: 79 },
  { region: '台州', currentMonthSessions: 4, yearlyTotalSessions: 47, targetSessions: 52, completionRate: 90 },
  { region: '舟山', currentMonthSessions: 4, yearlyTotalSessions: 48, targetSessions: 52, completionRate: 92 }
];

export const organizationDashboardData: OrganizationDashboardData = {
  regionalCentralInspection: regionalCentralInspectionData,
  regionalGroupInspection: regionalGroupInspectionData,
  regionalEightRegulations: regionalEightRegulationsData,
  regionalPartyEducation: regionalPartyEducationData,
  regionalLongTermMechanism: regionalLongTermMechanismData,
  regionalPartyCommittee: regionalPartyCommitteeData,
  regionalTheoryStudy: regionalTheoryStudyData,
  overallEfficiencyRate: 82
};

// 数据驾驶舱完整数据
export const dashboardData: DashboardData = {
  centralInspection: centralInspectionData,
  groupInspection: groupInspectionData,
  eightRegulationsStudy: eightRegulationsStudyData,
  partyEducation: partyEducationData,
  longTermMechanism: longTermMechanismData,
  partyCommittee: partyCommitteeData,
  theoryStudyGroup: theoryStudyGroupData,
  companyOperation: companyOperationData,
  performanceTrend: performanceTrendData,
  departments: departmentData,
  organizationEfficiencyRate: 78,
  organizationDashboard: organizationDashboardData
};

// 模拟API调用 - 获取数据驾驶舱数据
export const getDashboardData = (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      resolve(dashboardData);
    }, 100);
  });
};

// 模拟API调用 - 获取个人工作数据
export const getPersonalWorkData = (): Promise<{
  completionData: CentralInspectionItem[];
  taskData: GroupInspectionItem[];
  trendData: LongTermMechanismItem[];
  completionRate: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        completionData: centralInspectionData,
        taskData: groupInspectionData,
        trendData: longTermMechanismData,
        completionRate: 82
      });
    }, 80);
  });
};

// 模拟API调用 - 获取组织数据
export const getOrganizationData = (): Promise<{
  operationData: CompanyOperationItem[];
  departmentData: DepartmentItem[];
  performanceData: PerformanceTrendItem[];
  efficiencyRate: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        operationData: companyOperationData,
        departmentData: departmentData,
        performanceData: performanceTrendData,
        efficiencyRate: 78
      });
    }, 120);
  });
}; 