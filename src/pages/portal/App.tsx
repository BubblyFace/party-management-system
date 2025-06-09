import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import HeroSection from './components/HeroSection';
import DashboardCard from './components/DashboardCard';
import { DataDashboard } from './components/DataDashboard';
import { dashboardCards, getPartyCommitteeMembers, type PartyMember } from './data/mockData';
import ModuleContainer from './components/ModuleContainer';
import PartyCommitteeMembers from './components/PartyCommitteeMembers';
import { AppstoreOutlined, TeamOutlined } from '@ant-design/icons';

function App() {
  const navigate = useNavigate();
  const [partyMembers, setPartyMembers] = useState<PartyMember[]>([]);

  useEffect(() => {
    // 加载党委成员数据
    getPartyCommitteeMembers().then(setPartyMembers);
  }, []);

  const handleCardClick = (cardId: number) => {
    const card = dashboardCards.find(c => c.id === cardId);
    if (card?.path) {
      navigate(card.path);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="relative">
        <HeroSection />
        
        {/* 全局数据仪表板 */}
        <section className="relative z-10 -mt-16 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DataDashboard />
          </div>
        </section>
        
        {/* 党委小组成员 */}
        <section className="relative z-10 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ModuleContainer
              title="党委小组成员"
              description="党委领导班子成员及职责分工情况"
              icon={<TeamOutlined className="mr-2" />}
              badge={{ text: "6位成员" }}
              compact={true}
            >
              <PartyCommitteeMembers members={partyMembers} />
            </ModuleContainer>
          </div>
        </section>
        
        {/* 功能模块 */}
        <section className="relative z-10 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ModuleContainer
              title="功能模块"
              description="提供完整的党建工作管理功能，助力提升工作效率"
              icon={<AppstoreOutlined />}
              badge={{ text: "智能工作台" }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {dashboardCards.map((card, index) => (
                  <DashboardCard
                    key={index}
                    card={card}
                    onClick={() => handleCardClick(card.id)}
                  />
                ))}
              </div>
            </ModuleContainer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App; 