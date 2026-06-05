import React from 'react';
import { LayoutTemplate, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { useAppStore } from '../store/store';

const ProjectCommandCenter: React.FC = () => {
  const { dashboardData } = useAppStore();
  
  // Hardcoded for demo purposes since we haven't fetched all projects specifically into store yet
  const projects = [
    { name: 'Project Phoenix', status: 'Red', health: 35, burn: 84 },
    { name: 'Project Atlas', status: 'Green', health: 92, burn: 50 },
    { name: 'Project Orion', status: 'Red', health: 45, burn: 93 },
    { name: 'Project Meridian', status: 'Amber', health: 68, burn: 60 },
    { name: 'Project Horizon', status: 'Green', health: 88, burn: 30 },
  ];

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <LayoutTemplate className="w-6 h-6 text-azure-light" />
            Project Command Center
          </h1>
          <p className="text-gray-400 text-sm mt-1">Unified matrix of all active organizational initiatives</p>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/40 text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-white/10">
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">RAG Status</th>
              <th className="px-6 py-4">AI Health Narrative</th>
              <th className="px-6 py-4">Budget Burn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((proj, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-gray-200">{proj.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Last updated 2h ago</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide border 
                    ${proj.status === 'Red' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 
                      proj.status === 'Amber' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 
                      'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                    {proj.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300 max-w-sm line-clamp-2">
                    {proj.status === 'Red' ? 'Critical vendor delays impacting milestone delivery. Recommend immediate escalation.' : 
                     proj.status === 'Amber' ? 'Resource constraints identified in UAT phase. Monitor closely.' :
                     'All milestones on track. Budget utilization is within expected parameters.'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="flex items-center gap-3">
                     <div className="w-24 bg-black/50 rounded-full h-1.5 overflow-hidden">
                       <div className={`${proj.burn > 80 ? 'bg-red-500' : proj.burn > 60 ? 'bg-amber-400' : 'bg-azure-light'} h-full rounded-full`} style={{ width: `${proj.burn}%` }}></div>
                     </div>
                     <span className="text-xs font-semibold text-gray-400">{proj.burn}%</span>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectCommandCenter;
