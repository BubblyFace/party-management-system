import type { User, DutyItem, MeetingTopic, EducationRecord, InspectionItem } from '../types';

// 存储键名常量
const STORAGE_KEYS = {
  USERS: 'party_system_users',
  DUTY_ITEMS: 'party_system_duty_items',
  MEETING_TOPICS: 'party_system_meeting_topics',
  EDUCATION_RECORDS: 'party_system_education_records',
  INSPECTION_ITEMS: 'party_system_inspection_items',
  CURRENT_USER: 'party_system_current_user'
};

// 通用存储操作类
export class LocalStorage {
  // 获取数据
  static get<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
      return [];
    }
  }

  // 保存数据
  static set<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  // 添加单条数据
  static add<T extends { id: string }>(key: string, item: T): void {
    const items = this.get<T>(key);
    items.push(item);
    this.set(key, items);
  }

  // 更新数据
  static update<T extends { id: string }>(key: string, updatedItem: T): void {
    const items = this.get<T>(key);
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      this.set(key, items);
    }
  }

  // 删除数据
  static delete<T extends { id: string }>(key: string, id: string): void {
    const items = this.get<T>(key);
    const filteredItems = items.filter(item => item.id !== id);
    this.set(key, filteredItems);
  }

  // 根据ID获取单条数据
  static getById<T extends { id: string }>(key: string, id: string): T | undefined {
    const items = this.get<T>(key);
    return items.find(item => item.id === id);
  }
}

// 用户相关操作
export const UserStorage = {
  getAll: (): User[] => LocalStorage.get<User>(STORAGE_KEYS.USERS),
  add: (user: User) => LocalStorage.add(STORAGE_KEYS.USERS, user),
  update: (user: User) => LocalStorage.update(STORAGE_KEYS.USERS, user),
  delete: (id: string) => LocalStorage.delete<User>(STORAGE_KEYS.USERS, id),
  getById: (id: string) => LocalStorage.getById<User>(STORAGE_KEYS.USERS, id),
  
  // 设置当前用户
  setCurrentUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },
  
  // 获取当前用户
  getCurrentUser: (): User | null => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },
  
  // 退出登录
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

// 履职事项相关操作
export const DutyStorage = {
  getAll: (): DutyItem[] => LocalStorage.get<DutyItem>(STORAGE_KEYS.DUTY_ITEMS),
  add: (item: DutyItem) => LocalStorage.add(STORAGE_KEYS.DUTY_ITEMS, item),
  update: (item: DutyItem) => LocalStorage.update(STORAGE_KEYS.DUTY_ITEMS, item),
  delete: (id: string) => LocalStorage.delete<DutyItem>(STORAGE_KEYS.DUTY_ITEMS, id),
  getById: (id: string) => LocalStorage.getById<DutyItem>(STORAGE_KEYS.DUTY_ITEMS, id),
  
  // 获取分配给特定用户的履职事项
  getByAssignedTo: (userId: string): DutyItem[] => {
    return LocalStorage.get<DutyItem>(STORAGE_KEYS.DUTY_ITEMS)
      .filter(item => item.assignedTo === userId);
  }
};

// 会议台账相关操作
export const MeetingStorage = {
  getAll: (): MeetingTopic[] => LocalStorage.get<MeetingTopic>(STORAGE_KEYS.MEETING_TOPICS),
  add: (topic: MeetingTopic) => LocalStorage.add(STORAGE_KEYS.MEETING_TOPICS, topic),
  update: (topic: MeetingTopic) => LocalStorage.update(STORAGE_KEYS.MEETING_TOPICS, topic),
  delete: (id: string) => LocalStorage.delete<MeetingTopic>(STORAGE_KEYS.MEETING_TOPICS, id),
  getById: (id: string) => LocalStorage.getById<MeetingTopic>(STORAGE_KEYS.MEETING_TOPICS, id)
};

// 教育学习台账相关操作
export const EducationStorage = {
  getAll: (): EducationRecord[] => LocalStorage.get<EducationRecord>(STORAGE_KEYS.EDUCATION_RECORDS),
  add: (record: EducationRecord) => LocalStorage.add(STORAGE_KEYS.EDUCATION_RECORDS, record),
  update: (record: EducationRecord) => LocalStorage.update(STORAGE_KEYS.EDUCATION_RECORDS, record),
  delete: (id: string) => LocalStorage.delete<EducationRecord>(STORAGE_KEYS.EDUCATION_RECORDS, id),
  getById: (id: string) => LocalStorage.getById<EducationRecord>(STORAGE_KEYS.EDUCATION_RECORDS, id)
};

// 巡视整改相关操作
export const InspectionStorage = {
  getAll: (): InspectionItem[] => LocalStorage.get<InspectionItem>(STORAGE_KEYS.INSPECTION_ITEMS),
  add: (item: InspectionItem) => LocalStorage.add(STORAGE_KEYS.INSPECTION_ITEMS, item),
  update: (item: InspectionItem) => LocalStorage.update(STORAGE_KEYS.INSPECTION_ITEMS, item),
  delete: (id: string) => LocalStorage.delete<InspectionItem>(STORAGE_KEYS.INSPECTION_ITEMS, id),
  getById: (id: string) => LocalStorage.getById<InspectionItem>(STORAGE_KEYS.INSPECTION_ITEMS, id),
  
  // 获取特定责任人的整改项目
  getByResponsiblePerson: (userId: string): InspectionItem[] => {
    return LocalStorage.get<InspectionItem>(STORAGE_KEYS.INSPECTION_ITEMS)
      .filter(item => item.responsiblePerson === userId);
  }
}; 