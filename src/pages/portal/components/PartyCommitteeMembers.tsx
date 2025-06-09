import React from 'react';

interface PartyMember {
  id: number;
  name: string;
  position: string;
  department: string;
  role: 'primary' | 'secondary' | 'member';
}

interface PartyCommitteeMembersProps {
  members: PartyMember[];
}

// 随机背景色数组
const avatarColors = [
  'bg-red-500',
  'bg-blue-500', 
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500'
];

// 根据ID获取固定的随机背景色
const getAvatarColor = (id: number) => {
  return avatarColors[id % avatarColors.length];
};

// 获取姓名首字
const getFirstChar = (name: string) => {
  return name.charAt(0);
};

const PartyCommitteeMembers: React.FC<PartyCommitteeMembersProps> = ({ members }) => {
  return (
    <div className="grid grid-cols-6 gap-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-all duration-200 group hover:border-blue-300"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className={`w-8 h-8 ${getAvatarColor(member.id)} rounded-full flex items-center justify-center text-white font-bold shadow-sm`}>
              {getFirstChar(member.name)}
            </div>
            <div className="flex items-center space-x-2 text-center">
              <span className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                {member.name}
              </span>
              <span className="text-xs text-gray-600">
                {member.position}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartyCommitteeMembers; 