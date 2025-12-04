import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

interface Props {
  code: string;
  language?: string;
  filename?: string;
  onDownload?: () => void;
}

const CodeViewer: React.FC<Props> = ({ code, language = 'bash', filename, onDownload }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">{filename || 'script'}</span>
        <div className="flex gap-2">
           {onDownload && (
            <button
              onClick={onDownload}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Download file"
            >
              <Download size={14} />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded transition-all"
          >
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="flex-1 p-4 overflow-auto text-sm font-mono text-slate-300 leading-relaxed bg-[#0d1117]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeViewer;
