import React, { useState, useEffect } from 'react'

const Popup: React.FC = () => {
  const [activeTrain, setActiveTrain] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(['profiles', 'activeProfileId'], (result) => {
      const active = (result.profiles as any[])?.find(p => p.id === result.activeProfileId);
      if (active) setActiveTrain(active.trainNo);
    });
  }, []);

  return (
    <div className="w-80 bg-slate-50 shadow-xl overflow-hidden rounded-lg border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Tatkal Pro</h1>
              <p className="text-xs text-blue-100 opacity-80">High-Speed Booking Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engine Status</span>
            </div>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Ready</span>
          </div>
          
          <div className="pt-2 border-t border-slate-50">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Active Profile</p>
            <p className="text-sm font-bold text-slate-700">
              {activeTrain ? `Train No: ${activeTrain}` : 'No Profile Selected'}
            </p>
          </div>
        </div>

        <button 
          className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-slate-200 active:scale-95"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span>Configure Profiles</span>
        </button>

        <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">Automation triggers on IRCTC pages</p>
      </div>
    </div>
  )
}

export default Popup
