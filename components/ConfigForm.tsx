import React from 'react';
import { Feature } from '../types';
import { Terminal, Layout, Code, Zap, Smartphone, Shield } from 'lucide-react';

const FEATURES: Feature[] = [
  {
    title: 'Modded XFCE4',
    description: 'Pre-configured with Arc-Dark theme, Papirus icons, and a clean layout.',
    icon: Layout
  },
  {
    title: 'Dev Ready',
    description: 'Includes VS Code (code-server), Git, Python3, and build essentials out of the box.',
    icon: Code
  },
  {
    title: 'Proot Powered',
    description: 'Runs via proot-distro for maximum stability and performance without root.',
    icon: Zap
  },
  {
    title: 'Touch Optimized',
    description: 'Scaled for mobile screens with helpful on-screen keyboard shortcuts.',
    icon: Smartphone
  },
  {
    title: 'Secure VNC',
    description: 'Localhost-only VNC server with password protection enabled by default.',
    icon: Shield
  },
  {
    title: 'One-Line Setup',
    description: 'Automated installer handles dependencies, config, and shortcuts.',
    icon: Terminal
  }
];

const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {FEATURES.map((feature, idx) => (
        <div key={idx} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex gap-4 hover:border-orange-500/50 transition-colors">
          <div className="bg-slate-800 p-3 rounded-lg h-fit text-orange-500">
            <feature.icon size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-200 text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;