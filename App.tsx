import React, { useState } from 'react';
import CodeViewer from './components/CodeViewer';
import Features from './components/ConfigForm'; // Actually Features.tsx now
import { SOLO_UBUNTU_SCRIPT, MANUAL_GUIDE } from './utils/generator';
import { TabOption } from './types';
import { Terminal, Download, BookOpen, Github, Monitor, Copy, Code, List } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabOption>('install');

  const ONE_LINER = `curl -fsSL https://raw.githubusercontent.com/user/solo-ubuntu/main/install.sh | bash`;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-orange-500/30">
      
      {/* Hero Section */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 to-[#0a0a0c]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                v2.1 Modded Edition
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Solo <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Ubuntu</span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                The definitive modded Ubuntu experience for Termux. 
                Complete with <span className="text-slate-200">XFCE4</span>, <span className="text-slate-200">VS Code</span>, and <span className="text-slate-200">Arc Dark</span> theming.
                No root required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={() => setActiveTab('install')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-orange-900/20"
                >
                  <Terminal size={18} />
                  Get Installer
                </button>
                <button 
                  onClick={() => setActiveTab('manual')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-all border border-slate-700"
                >
                  <List size={18} />
                  Step-by-Step
                </button>
              </div>
            </div>

            {/* Quick Copy Card */}
            <div className="w-full md:w-[480px]">
               <div className="bg-[#1e1e24] border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                 <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/50" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                     <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <span className="text-xs font-mono text-slate-500">termux</span>
                 </div>
                 <div className="p-6 space-y-4">
                   <p className="text-slate-400 text-sm">Paste this into Termux to start:</p>
                   <div className="group relative">
                     <code className="block bg-black/50 p-4 rounded-lg text-sm text-green-400 font-mono break-all border border-slate-800 group-hover:border-slate-600 transition-colors">
                       {ONE_LINER}
                     </code>
                     <button 
                        onClick={() => navigator.clipboard.writeText(ONE_LINER)}
                        className="absolute right-2 top-2 p-2 bg-slate-800 text-slate-400 rounded hover:text-white hover:bg-slate-700 transition-colors"
                        title="Copy Command"
                     >
                       <Copy size={14} />
                     </button>
                   </div>
                   <div className="flex gap-4 text-xs text-slate-500 font-mono">
                     <span className="flex items-center gap-1"><Download size={12}/> 450MB</span>
                     <span className="flex items-center gap-1"><Monitor size={12}/> 1280x720</span>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Viewer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {activeTab === 'install' ? <Code className="text-orange-500"/> : <List className="text-blue-500"/>}
                {activeTab === 'install' ? 'Source Code' : 'Manual Steps'}
              </h2>
              
              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button 
                  onClick={() => setActiveTab('install')}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeTab === 'install' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                >
                  install.sh
                </button>
                <button 
                   onClick={() => setActiveTab('manual')}
                   className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeTab === 'manual' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                >
                  Guide.md
                </button>
              </div>
            </div>

            <div className="h-[600px]">
              <CodeViewer 
                code={activeTab === 'install' ? SOLO_UBUNTU_SCRIPT : MANUAL_GUIDE}
                language={activeTab === 'install' ? 'bash' : 'markdown'}
                filename={activeTab === 'install' ? 'install.sh' : 'README.md'}
              />
            </div>
          </div>

          {/* Sidebar / Features */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* New Prerequisites Block */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
               <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                 <Terminal size={16} className="text-green-500"/> 
                 Prerequisites
               </h3>
               <p className="text-sm text-slate-400 mb-3">
                 Before running anything, update Termux dependencies:
               </p>
               <div className="relative group">
                 <code className="block bg-black p-3 rounded-lg text-xs font-mono text-green-400 border border-slate-800">
                   pkg update -y && pkg install -y proot-distro git
                 </code>
                 <button 
                    onClick={() => navigator.clipboard.writeText("pkg update -y && pkg install -y proot-distro git")}
                    className="absolute right-2 top-2 p-1.5 bg-slate-800 text-slate-400 rounded hover:text-white hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy"
                 >
                   <Copy size={12} />
                 </button>
               </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6">Why Solo Ubuntu?</h2>
              <Features />
            </div>

            <div className="bg-[#1e1e24] p-6 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-2">Community & Source</h3>
              <p className="text-sm text-slate-400 mb-4">
                This project relies on the amazing <code className="text-orange-400">proot-distro</code> by Termux and is inspired by the modding community.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors">
                <Github size={16} /> View on GitHub
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default App;