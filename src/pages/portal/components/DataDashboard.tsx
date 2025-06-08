import { useState, useEffect } from 'react';
import { Card, Tabs, Progress, Spin } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { Column, Pie, Line } from '@ant-design/plots';
import ModuleContainer from './ModuleContainer';
import { getDashboardData } from '../data/mockData';
import type { DashboardData } from '../types';

// 类型定义
type TabType = 'personal' | 'company';

export function DataDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // 组件挂载时获取数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 如果数据还未加载完成，显示loading
  if (loading || !dashboardData) {
    return (
      <ModuleContainer
        title="数据驾驶舱"
        description="党建工作数字化监控中心，实时了解工作进展和绩效表现"
        icon={<BarChartOutlined />}
        badge={{ text: "智能分析" }}
      >
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="正在加载数据..." />
        </div>
      </ModuleContainer>
    );
  }

  // 获取数据
  const centralInspectionData = dashboardData.centralInspection;
  const groupInspectionData = dashboardData.groupInspection;
  const eightRegulationsStudy = dashboardData.eightRegulationsStudy;
  const partyEducation = dashboardData.partyEducation;
  const longTermMechanismData = dashboardData.longTermMechanism;
  const partyCommitteeData = dashboardData.partyCommittee;
  const theoryStudyGroup = dashboardData.theoryStudyGroup;

  // 简单的进度卡片组件
  const ProgressCard = ({ title, completed, total, rate }: { title: string; completed: number; total: number; rate: number }) => (
    <div className="text-center h-full flex flex-col justify-center">
      <Progress
        type="circle"
        percent={rate}
        size={collapsed ? 80 : 100}
        strokeColor={{
          '0%': '#1890ff',
          '100%': '#52c41a',
        }}
        format={() => `${rate}%`}
        strokeWidth={6}
      />
      <div className={`mt-2 ${collapsed ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>{title}</div>
      <div className={`${collapsed ? 'text-xs' : 'text-sm'} text-gray-500`}>{completed}/{total}</div>
    </div>
  );

  // 数字展示卡片
  const NumberCard = ({ title, current, total, description }: { title: string; current: number; total: number; description: string }) => (
    <div className="text-center h-full flex flex-col justify-center p-4">
      <div className={`${collapsed ? 'text-2xl' : 'text-3xl'} font-bold text-blue-600 mb-2`}>
        {current}/{total}
      </div>
      <div className={`${collapsed ? 'text-xs' : 'text-sm'} font-medium text-gray-700 mb-1`}>{title}</div>
      <div className={`${collapsed ? 'text-xs' : 'text-sm'} text-gray-500`}>{description}</div>
    </div>
  );

  const rightAction = (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
    >
      <BarChartOutlined />
      <span>{collapsed ? '展开详情' : '收起详情'}</span>
    </button>
  );

  return (
    <ModuleContainer
      title="数据驾驶舱"
      description="党建工作数字化监控中心，实时了解工作进展和绩效表现"
      icon={<BarChartOutlined />}
      rightAction={rightAction}
      badge={{ text: "智能分析" }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TabType)}
        size="small"
        items={[
          {
            key: 'personal',
            label: '党建工作仪表板',
            children: (
              <div>
                {/* 收起状态：只显示2个最重要的图表 */}
                {collapsed ? (
                  <div className="grid lg:grid-cols-2 gap-4">
                    <Card title="中央巡视整改" size="small" className="h-56">
                      <Column {...{
                        data: centralInspectionData.map(item => ({ name: item.name, value: item.completionRate })),
                        xField: 'name',
                        yField: 'value',
                        columnWidthRatio: 0.8,
                        color: '#1890FF',
                        height: 180,
                        autoFit: true,
                        label: {
                          position: 'top' as const,
                          content: '{value}%',
                          style: { fill: '#666', fontSize: 10 },
                        },
                        yAxis: { max: 100 },
                      }} />
                    </Card>
                    <Card title="八项规定学习" size="small" className="h-56">
                      <ProgressCard 
                        title="学习完成度"
                        completed={eightRegulationsStudy.completed}
                        total={eightRegulationsStudy.completed + eightRegulationsStudy.pending}
                        rate={eightRegulationsStudy.completionRate}
                      />
                    </Card>
                  </div>
                ) : (
                  <div>
                    {/* 展开状态：显示完整的7个模块 */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <Card title="中央巡视整改" size="small" className="h-56">
                        <Column {...{
                          data: centralInspectionData.map(item => ({ name: item.name, value: item.completionRate })),
                          xField: 'name',
                          yField: 'value',
                          columnWidthRatio: 0.8,
                          color: '#1890FF',
                          height: 180,
                          autoFit: true,
                          label: {
                            position: 'top' as const,
                            content: '{value}%',
                            style: { fill: '#666', fontSize: 10 },
                          },
                          yAxis: { max: 100 },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 9 },
                            },
                          },
                        }} />
                      </Card>
                      <Card title="集团巡视整改" size="small" className="h-56">
                        <Pie {...{
                          data: groupInspectionData.map(item => ({ 
                            type: item.name, 
                            value: item.completionRate 
                          })),
                          angleField: 'value',
                          colorField: 'type',
                          radius: 0.7,
                          innerRadius: 0.4,
                          height: 180,
                          autoFit: true,
                          label: { 
                            type: 'inner',
                            offset: '-50%',
                            content: '{percentage}',
                            style: { fontSize: 10, fill: '#fff' },
                          },
                          legend: {
                            position: 'bottom',
                            itemName: { style: { fontSize: 9 } },
                          },
                        }} />
                      </Card>
                      <Card title="八项规定学习" size="small" className="h-56">
                        <ProgressCard 
                          title="学习完成度"
                          completed={eightRegulationsStudy.completed}
                          total={eightRegulationsStudy.completed + eightRegulationsStudy.pending}
                          rate={eightRegulationsStudy.completionRate}
                        />
                      </Card>
                      <Card title="党内集中教育" size="small" className="h-56">
                        <ProgressCard 
                          title="教育完成度"
                          completed={partyEducation.completed}
                          total={partyEducation.completed + partyEducation.pending}
                          rate={partyEducation.completionRate}
                        />
                      </Card>
                    </div>
                    
                    {/* 展开时的额外详细内容 */}
                    <div className="grid lg:grid-cols-3 gap-4">
                      <Card title="健全贯彻落实长效机制" size="small" className="h-64">
                        <Column {...{
                          data: longTermMechanismData.flatMap(item => [
                            { name: item.name, value: item.completed, type: '已完成' },
                            { name: item.name, value: item.pending, type: '待完成' }
                          ]),
                          isGroup: true,
                          xField: 'name',
                          yField: 'value',
                          seriesField: 'type',
                          color: ['#52C41A', '#FA8C16'],
                          height: 180,
                          autoFit: true,
                          label: { 
                            position: 'top' as const,
                            style: { fontSize: 10 } 
                          },
                          legend: {
                            position: 'bottom',
                            itemName: { style: { fontSize: 10 } },
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 9 },
                            },
                          },
                          yAxis: {
                            label: {
                              style: { fontSize: 10 },
                            },
                          },
                        }} />
                      </Card>
                      <Card title="党委会" size="small" className="h-64">
                        <Column {...{
                          data: partyCommitteeData,
                          xField: 'name',
                          yField: 'value',
                          columnWidthRatio: 0.6,
                          color: '#1890FF',
                          height: 180,
                          autoFit: true,
                          appendPadding: [10, 10, 10, 10],
                          label: {
                            position: 'top' as const,
                            style: {
                              fill: '#666',
                              fontSize: 10,
                              fontWeight: 'bold',
                            },
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: {
                                fontSize: 9,
                              },
                            },
                          },
                          yAxis: {
                            label: {
                              formatter: (v: string) => `${v}`,
                              style: {
                                fontSize: 10,
                              },
                            },
                          },
                          meta: {
                            value: {
                              alias: '数量',
                            },
                          },
                        }} />
                      </Card>
                      <Card title="党委理论中心组学习" size="small" className="h-64">
                        <NumberCard 
                          title="学习进度"
                          current={theoryStudyGroup.currentMonthSessions}
                          total={12}
                          description={`本年累计: ${theoryStudyGroup.yearlyTotalSessions}次`}
                        />
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            ),
          },
          {
            key: 'company',
            label: '组织仪表板',
            children: (
              <div>
                {/* 收起状态：只显示2个最重要的图表 */}
                {collapsed ? (
                  <div className="grid lg:grid-cols-2 gap-4">
                    <Card title="中央巡视整改完成率" size="small" className="h-56">
                      <Column {...{
                        data: dashboardData.organizationDashboard.regionalCentralInspection,
                        xField: 'region',
                        yField: 'completionRate',
                        columnWidthRatio: 0.6,
                        color: '#1890FF',
                        height: 180,
                        autoFit: true,
                        label: {
                          position: 'top' as const,
                          content: '{value}%',
                          style: { fill: '#666', fontSize: 10 },
                        },
                        xAxis: {
                          label: {
                            autoRotate: true,
                            style: { fontSize: 9 },
                          },
                        },
                        yAxis: { max: 100 },
                      }} />
                    </Card>
                    <Card title="党内集中教育进度" size="small" className="h-56">
                      <Column {...{
                        data: dashboardData.organizationDashboard.regionalPartyEducation,
                        xField: 'region',
                        yField: 'completionRate',
                        columnWidthRatio: 0.6,
                        color: '#722ED1',
                        height: 180,
                        autoFit: true,
                        label: {
                          position: 'top' as const,
                          content: '{value}%',
                          style: { fill: '#666', fontSize: 9 },
                        },
                        xAxis: {
                          label: {
                            autoRotate: true,
                            style: { fontSize: 8 },
                          },
                        },
                        yAxis: { max: 100 },
                      }} />
                    </Card>
                  </div>
                ) : (
                  <div>
                    {/* 展开状态：显示完整的组织仪表板 */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <Card title="中央巡视整改完成率" size="small" className="h-56">
                        <Column {...{
                          data: dashboardData.organizationDashboard.regionalCentralInspection,
                          xField: 'region',
                          yField: 'completionRate',
                          columnWidthRatio: 0.6,
                          color: '#1890FF',
                          height: 180,
                          autoFit: true,
                          label: {
                            position: 'top' as const,
                            content: '{value}%',
                            style: { fill: '#666', fontSize: 9 },
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 8 },
                            },
                          },
                          yAxis: { max: 100 },
                        }} />
                      </Card>
                      <Card title="集团巡视整改完成率" size="small" className="h-56">
                        <Column {...{
                          data: dashboardData.organizationDashboard.regionalGroupInspection,
                          xField: 'region',
                          yField: 'completionRate',
                          columnWidthRatio: 0.6,
                          color: '#52C41A',
                          height: 180,
                          autoFit: true,
                          label: {
                            position: 'top' as const,
                            content: '{value}%',
                            style: { fill: '#666', fontSize: 9 },
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 8 },
                            },
                          },
                          yAxis: { max: 100 },
                        }} />
                      </Card>
                      <Card title="八项规定学习完成率" size="small" className="h-56">
                        <Column {...{
                          data: dashboardData.organizationDashboard.regionalEightRegulations,
                          xField: 'region',
                          yField: 'completionRate',
                          columnWidthRatio: 0.6,
                          color: '#FA8C16',
                          height: 180,
                          autoFit: true,
                          label: {
                            position: 'top' as const,
                            content: '{value}%',
                            style: { fill: '#666', fontSize: 9 },
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 8 },
                            },
                          },
                          yAxis: { max: 100 },
                        }} />
                      </Card>
                      <Card title="党内集中教育进度" size="small" className="h-56">
                        <Column {...{
                          data: dashboardData.organizationDashboard.regionalPartyEducation,
                          xField: 'region',
                          yField: 'completionRate',
                          columnWidthRatio: 0.6,
                          color: '#722ED1',
                          height: 180,
                          autoFit: true,
                          label: {
                            position: 'top' as const,
                            content: '{value}%',
                            style: { fill: '#666', fontSize: 9 },
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 8 },
                            },
                          },
                          yAxis: { max: 100 },
                        }} />
                      </Card>
                    </div>
                    
                    {/* 展开时的额外详细内容 */}
                    <div className="grid lg:grid-cols-3 gap-4">
                      <Card title="党内集中教育完成率" size="small" className="h-64">
                        <Column {...{
                          data: dashboardData.organizationDashboard.regionalPartyEducation,
                          xField: 'region',
                          yField: 'completionRate',
                          columnWidthRatio: 0.6,
                          color: '#722ED1',
                          height: 180,
                          autoFit: true,
                          label: {
                            position: 'top' as const,
                            content: '{value}%',
                            style: { fill: '#666', fontSize: 9 },
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 8 },
                            },
                          },
                          yAxis: { max: 100 },
                        }} />
                      </Card>
                      <Card title="理论学习中心组学习进度" size="small" className="h-64">
                        <Line {...{
                          data: dashboardData.organizationDashboard.regionalTheoryStudy,
                          xField: 'region',
                          yField: 'completionRate',
                          height: 180,
                          point: {
                            size: 4,
                            shape: 'circle',
                          },
                          color: '#13C2C2',
                          label: {
                            style: { fontSize: 9 }
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 8 },
                            },
                          },
                          yAxis: {
                            label: {
                              style: { fontSize: 9 },
                            },
                            max: 100
                          },
                        }} />
                      </Card>
                      <Card title="党委会决策统计" size="small" className="h-64">
                        <Column {...{
                          data: dashboardData.organizationDashboard.regionalPartyCommittee.map(item => [
                            { region: item.region, type: '重大决策', value: item.majorDecisions },
                            { region: item.region, type: '会议议题', value: item.meetingTopics },
                            { region: item.region, type: '专题研究', value: item.specialResearch },
                            { region: item.region, type: '集体决策', value: item.collectiveDecisions }
                          ]).flat(),
                          xField: 'region',
                          yField: 'value',
                          seriesField: 'type',
                          isGroup: true,
                          height: 180,
                          autoFit: true,
                          label: {
                            position: 'top' as const,
                            style: { fontSize: 8 }
                          },
                          xAxis: {
                            label: {
                              autoRotate: true,
                              style: { fontSize: 7 },
                            },
                          },
                          yAxis: {
                            label: {
                              style: { fontSize: 8 },
                            },
                          },
                          legend: {
                            position: 'bottom',
                            itemName: {
                              style: { fontSize: 8 }
                            },
                          },
                        }} />
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
    </ModuleContainer>
  );
} 