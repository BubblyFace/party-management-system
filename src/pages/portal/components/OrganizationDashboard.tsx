import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { Line, Column } from '@ant-design/plots';
import type { OrganizationDashboardData } from '../types';
import { getDashboardData } from '../data/mockData';

const OrganizationDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OrganizationDashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData.organizationDashboard);
      } catch (error) {
        console.error('Failed to fetch organization data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return <div>暂无数据</div>;
  }

  // 中央巡视整改完成率配置
  const centralInspectionConfig = {
    data: data.regionalCentralInspection,
    xField: 'region',
    yField: 'completionRate',
    colorField: 'region',
    height: 300,
    meta: {
      completionRate: {
        alias: '完成率 (%)',
      },
    },
    label: {
      position: 'middle' as const,
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  // 集团巡视整改对比配置
  const groupInspectionConfig = {
    data: data.regionalGroupInspection,
    xField: 'region',
    yField: 'completionRate',
    colorField: 'region',
    height: 300,
    meta: {
      completionRate: {
        alias: '完成率 (%)',
      },
    },
    label: {
      position: 'middle' as const,
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  // 八项规定学习完成情况
  const eightRegulationsData = data.regionalEightRegulations.map(item => [
    { region: item.region, type: '已完成', value: item.completed },
    { region: item.region, type: '待处理', value: item.pending }
  ]).flat();

  const eightRegulationsConfig = {
    data: eightRegulationsData,
    xField: 'region',
    yField: 'value',
    seriesField: 'type',
    height: 300,
    isStack: true,
    meta: {
      value: {
        alias: '数量',
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    color: ['#52c41a', '#faad14'],
  };

  // 党委会决策数据
  const partyCommitteeData = data.regionalPartyCommittee.map(item => [
    { region: item.region, type: '重大决策', value: item.majorDecisions },
    { region: item.region, type: '会议议题', value: item.meetingTopics },
    { region: item.region, type: '专题研究', value: item.specialResearch },
    { region: item.region, type: '集体决策', value: item.collectiveDecisions }
  ]).flat();

  const partyCommitteeConfig = {
    data: partyCommitteeData,
    xField: 'region',
    yField: 'value',
    seriesField: 'type',
    height: 300,
    isGroup: true,
    meta: {
      value: {
        alias: '数量',
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  // 理论学习中心组学习进度
  const theoryStudyConfig = {
    data: data.regionalTheoryStudy,
    xField: 'region',
    yField: 'completionRate',
    height: 300,
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {},
    meta: {
      completionRate: {
        alias: '完成率 (%)',
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="组织效能总览" extra={`整体效能: ${data.overallEfficiencyRate}%`}>
            <div style={{ fontSize: '16px', color: '#666' }}>
              覆盖11个区域的党建工作组织管理情况，全面展示各地区党务工作开展成效。
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="中央巡视整改完成率" bodyStyle={{ padding: '16px' }}>
            <Column {...centralInspectionConfig} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="集团巡视整改完成率" bodyStyle={{ padding: '16px' }}>
            <Column {...groupInspectionConfig} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="八项规定学习完成情况" bodyStyle={{ padding: '16px' }}>
            <Column {...eightRegulationsConfig} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="党委会决策统计" bodyStyle={{ padding: '16px' }}>
            <Column {...partyCommitteeConfig} />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="理论学习中心组学习进度" bodyStyle={{ padding: '16px' }}>
            <Line {...theoryStudyConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizationDashboard; 