export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  children?: MenuItem[];
}

export interface DashboardCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  value: string | number;
  trend?: string;
  color: string;
  path?: string;
}

export interface StatItem {
  label: string;
  value: number | string;
  unit?: string;
  trend?: number;
  color?: string;
}

// 数据驾驶舱相关类型定义 - 更新为党建工作专用类型
export interface CentralInspectionItem {
  name: string;
  completed: number;
  total: number;
  completionRate: number;
  color: string;
}

export interface GroupInspectionItem {
  name: string;
  completed: number;
  total: number;
  completionRate: number;
  color: string;
}

export interface EightRegulationsStudyItem {
  name: string;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface PartyEducationItem {
  name: string;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface LongTermMechanismItem {
  name: string;
  completed: number;
  pending: number;
  color: string;
}

export interface PartyCommitteeItem {
  name: string;
  value: number;
  color: string;
}

export interface TheoryStudyGroupItem {
  currentMonthSessions: number;
  yearlyTotalSessions: number;
  targetSessions: number;
  completionRate: number;
}

// 保留组织仪表板需要的类型
export interface CompanyOperationItem {
  category: string;
  value: number;
  color: string;
}

export interface PerformanceTrendItem {
  period: string;
  income: number;
  cost: number;
  profit: number;
}

export interface DepartmentItem {
  name: string;
  value: number;
  color: string;
}

// 组织仪表板 - 区域数据类型
export interface RegionalCentralInspectionItem {
  region: string;
  completionRate: number;
  completed: number;
  total: number;
}

export interface RegionalGroupInspectionItem {
  region: string;
  completionRate: number;
  completed: number;
  total: number;
}

export interface RegionalEightRegulationsItem {
  region: string;
  completionRate: number;
  completed: number;
  pending: number;
}

export interface RegionalPartyEducationItem {
  region: string;
  completionRate: number;
  completed: number;
  pending: number;
}

export interface RegionalLongTermMechanismItem {
  region: string;
  firstTopicStudy: { completed: number; pending: number };
  systemExecution: { completed: number; pending: number };
  supervisionCheck: { completed: number; pending: number };
  rectificationImplementation: { completed: number; pending: number };
}

export interface RegionalPartyCommitteeItem {
  region: string;
  majorDecisions: number;
  meetingTopics: number;
  specialResearch: number;
  collectiveDecisions: number;
}

export interface RegionalTheoryStudyItem {
  region: string;
  currentMonthSessions: number;
  yearlyTotalSessions: number;
  targetSessions: number;
  completionRate: number;
}

export interface OrganizationDashboardData {
  regionalCentralInspection: RegionalCentralInspectionItem[];
  regionalGroupInspection: RegionalGroupInspectionItem[];
  regionalEightRegulations: RegionalEightRegulationsItem[];
  regionalPartyEducation: RegionalPartyEducationItem[];
  regionalLongTermMechanism: RegionalLongTermMechanismItem[];
  regionalPartyCommittee: RegionalPartyCommitteeItem[];
  regionalTheoryStudy: RegionalTheoryStudyItem[];
  overallEfficiencyRate: number;
}

export interface DashboardData {
  centralInspection: CentralInspectionItem[];
  groupInspection: GroupInspectionItem[];
  eightRegulationsStudy: EightRegulationsStudyItem;
  partyEducation: PartyEducationItem;
  longTermMechanism: LongTermMechanismItem[];
  partyCommittee: PartyCommitteeItem[];
  theoryStudyGroup: TheoryStudyGroupItem;
  // 保留原有的组织仪表板数据
  companyOperation: CompanyOperationItem[];
  performanceTrend: PerformanceTrendItem[];
  departments: DepartmentItem[];
  organizationEfficiencyRate: number;
  // 新增组织仪表板数据
  organizationDashboard: OrganizationDashboardData;
} 