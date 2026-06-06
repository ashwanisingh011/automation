import React, { useState, useEffect } from 'react'

interface Passenger {
  name: string;
  age: string;
  gender: 'M' | 'F' | 'T';
  birthPreference: string;
}

interface TravelProfile {
  id: string;
  trainNo: string;
  from: string;
  to: string;
  date: string;
  classCode: string;
  quotaCode: string;
  passengers: Passenger[];
}

const Options: React.FC = () => {
  const [profiles, setProfiles] = useState<TravelProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(['profiles', 'activeProfileId'], (result) => {
      if (result.profiles) {
        setProfiles(result.profiles as TravelProfile[]);
      }
      if (result.activeProfileId) {
        setActiveProfileId(result.activeProfileId as string);
      }
    });
  }, []);

  const addProfile = () => {
    const newProfile: TravelProfile = {
      id: Date.now().toString(),
      trainNo: '',
      from: '',
      to: '',
      date: '',
      classCode: '3A',
      quotaCode: 'TATKAL',
      passengers: [{ name: '', age: '', gender: 'M', birthPreference: '' }]
    };
    setProfiles([...profiles, newProfile]);
    if (!activeProfileId) setActiveProfileId(newProfile.id);
  };

  const [showSaveToast, setShowSaveToast] = useState(false);

  const saveProfiles = () => {
    chrome.storage.local.set({ profiles, activeProfileId }, () => {
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-24 right-8 z-50 animate-bounce">
          <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-bold">Profiles Saved Successfully!</span>
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">Tatkal <span className="text-blue-600">Pro</span></h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={addProfile} className="flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2 rounded-xl border border-slate-200 transition-all shadow-sm active:scale-95">
              <span>+ Add Profile</span>
            </button>
            <button onClick={saveProfiles} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
              Save Changes
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-800">Booking Profiles</h2>
          <p className="text-slate-500 mt-1">Configure your travel details for rapid automation.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {profiles.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-700">No profiles yet</h3>
              <p className="text-slate-400 mt-1">Create a profile to start automating your bookings.</p>
              <button onClick={addProfile} className="mt-6 text-blue-600 font-bold hover:underline">Create your first profile →</button>
            </div>
          ) : profiles.map((profile, index) => (
            <div key={profile.id} className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${activeProfileId === profile.id ? 'border-blue-500 shadow-2xl shadow-blue-100' : 'border-slate-100 hover:border-slate-200 shadow-xl shadow-slate-200/50'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Profile #{index + 1}</span>
                    {activeProfileId === profile.id && <span className="bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5 animate-pulse"></span>Active</span>}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mt-2">{profile.trainNo ? `Train ${profile.trainNo}` : "New Booking Profile"}</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setActiveProfileId(profile.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeProfileId === profile.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {activeProfileId === profile.id ? 'Primary Profile' : 'Select as Primary'}
                  </button>
                  <button 
                    onClick={() => setProfiles(profiles.filter(p => p.id !== profile.id))}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Train Number</label>
                  <input 
                    type="text" placeholder="e.g. 12951" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    value={profile.trainNo}
                    onChange={(e) => {
                      const newProfiles = [...profiles];
                      newProfiles[index].trainNo = e.target.value;
                      setProfiles(newProfiles);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Journey Date</label>
                  <input 
                    type="date" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    value={profile.date}
                    onChange={(e) => {
                      const newProfiles = [...profiles];
                      newProfiles[index].date = e.target.value;
                      setProfiles(newProfiles);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">From Station</label>
                  <input 
                    type="text" placeholder="e.g. NDLS" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 uppercase"
                    value={profile.from}
                    onChange={(e) => {
                      const newProfiles = [...profiles];
                      newProfiles[index].from = e.target.value;
                      setProfiles(newProfiles);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">To Station</label>
                  <input 
                    type="text" placeholder="e.g. BCT" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 uppercase"
                    value={profile.to}
                    onChange={(e) => {
                      const newProfiles = [...profiles];
                      newProfiles[index].to = e.target.value;
                      setProfiles(newProfiles);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Class</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    value={profile.classCode}
                    onChange={(e) => {
                      const newProfiles = [...profiles];
                      newProfiles[index].classCode = e.target.value;
                      setProfiles(newProfiles);
                    }}
                  >
                    <option value="1A">First AC (1A)</option>
                    <option value="2A">Second AC (2A)</option>
                    <option value="3A">Third AC (3A)</option>
                    <option value="3E">3 AC Economy (3E)</option>
                    <option value="CC">AC Chair Car (CC)</option>
                    <option value="SL">Sleeper (SL)</option>
                    <option value="2S">Second Sitting (2S)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Quota</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    value={profile.quotaCode}
                    onChange={(e) => {
                      const newProfiles = [...profiles];
                      newProfiles[index].quotaCode = e.target.value;
                      setProfiles(newProfiles);
                    }}
                  >
                    <option value="GENERAL">General</option>
                    <option value="TATKAL">Tatkal</option>
                    <option value="PREMIUM TATKAL">Premium Tatkal</option>
                    <option value="LADIES">Ladies</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Passenger Details
                  </h4>
                </div>
                
                <div className="space-y-4">
                  {profile.passengers.map((passenger, pIndex) => (
                    <div key={pIndex} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                      <div className="lg:col-span-4 space-y-1">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wider ml-1">Full Name</label>
                        <input 
                          type="text" placeholder="As per ID" 
                          className="w-full p-2.5 bg-slate-50 border border-slate-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm font-bold"
                          value={passenger.name}
                          onChange={(e) => {
                            const newProfiles = [...profiles];
                            newProfiles[index].passengers[pIndex].name = e.target.value;
                            setProfiles(newProfiles);
                          }}
                        />
                      </div>
                      <div className="lg:col-span-2 space-y-1">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wider ml-1">Age</label>
                        <input 
                          type="number" placeholder="25" 
                          className="w-full p-2.5 bg-slate-50 border border-slate-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm font-bold"
                          value={passenger.age}
                          onChange={(e) => {
                            const newProfiles = [...profiles];
                            newProfiles[index].passengers[pIndex].age = e.target.value;
                            setProfiles(newProfiles);
                          }}
                        />
                      </div>
                      <div className="lg:col-span-2 space-y-1">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wider ml-1">Gender</label>
                        <select 
                          className="w-full p-2.5 bg-slate-50 border border-slate-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm font-bold"
                          value={passenger.gender}
                          onChange={(e) => {
                            const newProfiles = [...profiles];
                            newProfiles[index].passengers[pIndex].gender = e.target.value as 'M' | 'F' | 'T';
                            setProfiles(newProfiles);
                          }}
                        >
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="T">Third</option>
                        </select>
                      </div>
                      <div className="lg:col-span-3 space-y-1">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wider ml-1">Berth</label>
                        <select 
                          className="w-full p-2.5 bg-slate-50 border border-slate-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm font-bold"
                          value={passenger.birthPreference}
                          onChange={(e) => {
                            const newProfiles = [...profiles];
                            newProfiles[index].passengers[pIndex].birthPreference = e.target.value;
                            setProfiles(newProfiles);
                          }}
                        >
                          <option value="">No Preference</option>
                          <option value="LB">Lower</option>
                          <option value="MB">Middle</option>
                          <option value="UB">Upper</option>
                          <option value="SL">Side Lower</option>
                          <option value="SU">Side Upper</option>
                        </select>
                      </div>
                      <div className="lg:col-span-1 flex justify-center pb-1">
                        <button 
                          onClick={() => {
                            const newProfiles = [...profiles];
                            newProfiles[index].passengers = newProfiles[index].passengers.filter((_, i) => i !== pIndex);
                            setProfiles(newProfiles);
                          }}
                          className="p-2 text-slate-200 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => {
                    const newProfiles = [...profiles];
                    newProfiles[index].passengers.push({ name: '', age: '', gender: 'M', birthPreference: '' });
                    setProfiles(newProfiles);
                  }}
                  className="mt-6 flex items-center space-x-2 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-700 transition-all group/btn"
                >
                  <span className="bg-blue-600 text-white p-1 rounded-md group-hover/btn:scale-110 transition-transform">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <span>Add Passenger</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="max-w-5xl mx-auto p-12 text-center text-slate-300">
        <p className="text-sm font-bold tracking-widest uppercase">Tatkal Pro v1.0.2</p>
        <p className="text-[10px] mt-2">Designed for elite booking speed and efficiency.</p>
      </footer>
    </div>
  )
}

export default Options
