import { useState, useEffect, useCallback, useMemo } from "react";

// Icons as simple SVG components
const Icons = {
  Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Activity: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Trophy: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  Edit: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

const COLORS = ['#6366f1','#ec4899','#14b8a6','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#84cc16'];
const EVENT_TYPES = ['Medical','Doctor Appointment','Homework','School','Sports','Birthday','Other'];
const ACTIVITY_CATS = ['Chores','Exercise','Study','Reading','Creative','Outdoor','Screen Time','Sleep'];

const genId = () => Math.random().toString(36).substr(2, 9);
const fmtDate = d => new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const today = () => new Date().toISOString().split('T')[0];

// Simple Bar Chart
const BarChart = ({data, colors}) => {
  const max = Math.max(...data.map(d=>d.value),1);
  return (
    <div className="flex items-end gap-1 h-40 mt-2">
      {data.map((d,i) => (
        <div key={i} className="flex flex-col items-center flex-1 min-w-0">
          <span className="text-xs font-bold mb-1">{d.value}</span>
          <div style={{height:`${(d.value/max)*100}%`,background:colors[i%colors.length],minHeight:d.value?4:0}} className="w-full rounded-t-sm transition-all"/>
          <span className="text-xs mt-1 truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// Donut Chart
const DonutChart = ({data, colors}) => {
  const total = data.reduce((s,d)=>s+d.value,0) || 1;
  let cum = 0;
  const segs = data.filter(d=>d.value>0).map((d,i) => {
    const start = cum/total*360;
    cum += d.value;
    const end = cum/total*360;
    return {start,end,color:colors[i%colors.length],label:d.label,value:d.value};
  });
  const r=60,cx=80,cy=80;
  return (
    <div className="flex items-center gap-4">
      <svg width="160" height="160" viewBox="0 0 160 160">
        {segs.map((s,i)=>{
          const s1=(s.start-90)*Math.PI/180, s2=(s.end-90)*Math.PI/180;
          const lg=s.end-s.start>180?1:0;
          const d=`M${cx+r*Math.cos(s1)} ${cy+r*Math.sin(s1)} A${r} ${r} 0 ${lg} 1 ${cx+r*Math.cos(s2)} ${cy+r*Math.sin(s2)} L${cx} ${cy} Z`;
          return <path key={i} d={d} fill={s.color} stroke="white" strokeWidth="2"/>;
        })}
        <circle cx={cx} cy={cy} r="35" fill="white"/>
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold" fill="#333">{total}</text>
      </svg>
      <div className="flex flex-col gap-1">
        {segs.map((s,i)=>(
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{background:s.color}}/>
            <span>{s.label}: {s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Weekly line-style chart
const WeeklyChart = ({data, color}) => {
  const max = Math.max(...data.map(d=>d.value),1);
  return (
    <div className="flex items-end gap-1 h-24 mt-2">
      {data.map((d,i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div style={{height:`${(d.value/max)*100}%`,background:color,minHeight:d.value?4:0}} className="w-full rounded-t transition-all"/>
          <span className="text-xs mt-1">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// Modal Component
const Modal = ({open,onClose,title,children}) => {
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-50"/>
      <div className="relative bg-white w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><Icons.X/></button>
        </div>
        {children}
      </div>
    </div>
  );
};

const defaultFamily = () => ({
  id: genId(),
  name: 'My Family',
  code: Math.random().toString(36).substr(2,6).toUpperCase(),
  members: [
    {id:genId(),name:'Parent 1',role:'parent',color:COLORS[0],pin:'1234'},
    {id:genId(),name:'Parent 2',role:'parent',color:COLORS[1],pin:'5678'},
    {id:genId(),name:'Child 1',role:'child',color:COLORS[2],pin:'0000',age:10}
  ],
  events: [
    {id:genId(),title:'Annual Checkup',type:'Medical',date:today(),memberId:'all',notes:'Family doctor visit',restricted:true},
    {id:genId(),title:'Math Homework',type:'Homework',date:today(),memberId:'all',notes:'Chapter 5 exercises',restricted:false}
  ],
  activities: [],
  rewards: [],
  accessRules: []
});

export default function FamilyWizard() {
  const [family, setFamily] = useState(defaultFamily);
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState('login');
  const [tab, setTab] = useState('home');
  const [modal, setModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today());
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  // Login / Setup
  const [loginMode, setLoginMode] = useState('select');
  const [joinCode, setJoinCode] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('parent');
  const [selectedMember, setSelectedMember] = useState(null);
  const [pin, setPin] = useState('');

  // Form states
  const [formData, setFormData] = useState({});

  const isChild = currentUser?.role === 'child';
  const isParent = currentUser?.role === 'parent';

  const login = (member) => {
    if(member.pin && member.pin !== '0000') {
      setSelectedMember(member);
      setLoginMode('pin');
    } else {
      setCurrentUser(member);
      setScreen('app');
    }
  };

  const verifyPin = () => {
    if(pin === selectedMember.pin || pin === '0000') {
      setCurrentUser(selectedMember);
      setScreen('app');
      setPin('');
    }
  };

  const addMember = () => {
    if(!newMemberName.trim()) return;
    const m = {id:genId(),name:newMemberName,role:newMemberRole,color:COLORS[family.members.length%COLORS.length],pin:'0000',age:newMemberRole==='child'?10:null};
    setFamily(f=>({...f,members:[...f.members,m]}));
    setNewMemberName('');
    setModal(null);
  };

  // Calendar
  const getDaysInMonth = (date) => {
    const y=date.getFullYear(), m=date.getMonth();
    const first=new Date(y,m,1).getDay();
    const days=new Date(y,m+1,0).getDate();
    return {first,days};
  };

  const getEventsForDate = (d) => {
    const visible = family.events.filter(e => {
      if(isChild && e.restricted) return false;
      return e.date === d;
    });
    return visible;
  };

  const addEvent = () => {
    const ev = {id:genId(),...formData,memberId:formData.memberId||'all'};
    setFamily(f=>({...f,events:[...f.events,ev]}));
    setFormData({});
    setModal(null);
  };

  const deleteEvent = (id) => {
    setFamily(f=>({...f,events:f.events.filter(e=>e.id!==id)}));
  };

  // Activities
  const addActivity = () => {
    const act = {id:genId(),...formData,memberId:formData.memberId||currentUser.id,date:formData.date||today(),duration:Number(formData.duration)||30,completed:false};
    setFamily(f=>({...f,activities:[...f.activities,act]}));
    setFormData({});
    setModal(null);
  };

  const toggleActivity = (id) => {
    setFamily(f=>({...f,activities:f.activities.map(a=>a.id===id?{...a,completed:!a.completed}:a)}));
  };

  const getActivityStats = () => {
    const acts = family.activities;
    const byCategory = ACTIVITY_CATS.map(c=>({label:c.substr(0,6),value:acts.filter(a=>a.category===c).length}));
    const byMember = family.members.map(m=>({label:m.name.substr(0,6),value:acts.filter(a=>a.memberId===m.id).length}));
    const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const byDay = days.map(d=>({label:d,value:acts.filter(a=>days[new Date(a.date).getDay()]===d).length}));
    const completed = acts.filter(a=>a.completed).length;
    const pending = acts.length - completed;
    return {byCategory,byMember,byDay,completion:[{label:'Done',value:completed},{label:'Pending',value:pending}]};
  };

  // Rewards
  const addReward = () => {
    const r = {id:genId(),...formData,points:Number(formData.points)||0,date:today(),awardedBy:currentUser.id};
    setFamily(f=>({...f,rewards:[...f.rewards,r]}));
    setFormData({});
    setModal(null);
  };

  const getRewardsByMember = (mid) => family.rewards.filter(r=>r.memberId===mid);
  const getTotalPoints = (mid) => getRewardsByMember(mid).reduce((s,r)=>s+r.points,0);

  // Calendar Render
  const renderCalendar = () => {
    const {first,days} = getDaysInMonth(calendarMonth);
    const y=calendarMonth.getFullYear(), m=calendarMonth.getMonth();
    const cells = [];
    for(let i=0;i<first;i++) cells.push(<div key={`e${i}`}/>);
    for(let d=1;d<=days;d++){
      const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const evts=getEventsForDate(ds);
      const isToday=ds===today();
      const isSel=ds===selectedDate;
      cells.push(
        <button key={d} onClick={()=>setSelectedDate(ds)}
          className={`relative p-1 rounded-lg text-sm font-medium transition-all
            ${isToday?'ring-2 ring-indigo-400':''}
            ${isSel?'bg-indigo-500 text-white':'hover:bg-gray-100'}`}>
          {d}
          {evts.length>0 && <div className="flex justify-center gap-0.5 mt-0.5">
            {evts.slice(0,3).map((e,i)=><div key={i} className="w-1.5 h-1.5 rounded-full" style={{background:isSel?'white':'#6366f1'}}/>)}
          </div>}
        </button>
      );
    }
    return cells;
  };

  // Login Screen
  if(screen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl">🧙‍♂️</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text" style={{WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Family Wizard</h1>
            <p className="text-gray-500 text-sm mt-1">Family ID: <span className="font-mono font-bold text-indigo-600">{family.code}</span></p>
          </div>

          {loginMode === 'pin' ? (
            <div>
              <p className="text-center text-gray-600 mb-4">Enter PIN for {selectedMember?.name}</p>
              <input type="password" maxLength={4} value={pin} onChange={e=>setPin(e.target.value)} placeholder="Enter PIN"
                className="w-full text-center text-2xl tracking-widest border-2 border-gray-200 rounded-xl p-3 mb-4 focus:border-indigo-500 focus:outline-none"/>
              <button onClick={verifyPin} className="w-full bg-indigo-500 text-white rounded-xl p-3 font-semibold hover:bg-indigo-600 transition-colors">Login</button>
              <button onClick={()=>{setLoginMode('select');setPin('')}} className="w-full mt-2 text-gray-500 text-sm">Back</button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 text-sm mb-3 text-center">Who's using the app?</p>
              <div className="space-y-2 mb-4">
                {family.members.map(m => (
                  <button key={m.id} onClick={()=>login(m)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{background:m.color}}>
                      {m.name[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{m.name}</div>
                      <div className="text-xs text-gray-400 capitalize">{m.role}</div>
                    </div>
                    {m.role === 'child' && <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">👶 Kid</span>}
                  </button>
                ))}
              </div>
              <button onClick={()=>setModal('addMember')} className="w-full border-2 border-dashed border-gray-300 rounded-xl p-3 text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2">
                <Icons.Plus/> Add Family Member
              </button>
            </div>
          )}
        </div>

        <Modal open={modal==='addMember'} onClose={()=>setModal(null)} title="Add Family Member">
          <input value={newMemberName} onChange={e=>setNewMemberName(e.target.value)} placeholder="Name" className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
          <select value={newMemberRole} onChange={e=>setNewMemberRole(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-4 focus:border-indigo-500 focus:outline-none">
            <option value="parent">Parent / Adult</option>
            <option value="child">Child</option>
          </select>
          <button onClick={addMember} className="w-full bg-indigo-500 text-white rounded-xl p-3 font-semibold">Add Member</button>
        </Modal>
      </div>
    );
  }

  // Main App
  const stats = getActivityStats();
  const todayEvents = getEventsForDate(selectedDate);
  const childMembers = family.members.filter(m=>m.role==='child');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <style>{`
        @keyframes slide-up{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        .animate-slide-up{animation:slide-up 0.3s ease-out}
        input,select,textarea{font-size:16px}
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 pt-10 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Family Wizard 🧙‍♂️</h1>
            <p className="text-indigo-100 text-sm">Welcome, {currentUser?.name} {isChild ? '👶' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full font-mono">{family.code}</span>
            <button onClick={()=>{setScreen('login');setCurrentUser(null);setTab('home')}} className="text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30">Switch</button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-4">

        {/* HOME */}
        {tab === 'home' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-3">👨‍👩‍👧‍👦 Family Members</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {family.members.map(m => (
                  <div key={m.id} className="flex flex-col items-center min-w-[60px]">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md" style={{background:m.color}}>{m.name[0]}</div>
                    <span className="text-xs mt-1 text-gray-600 truncate w-16 text-center">{m.name}</span>
                    <span className="text-xs text-gray-400 capitalize">{m.role}</span>
                  </div>
                ))}
                {isParent && (
                  <button onClick={()=>setModal('addMemberApp')} className="flex flex-col items-center min-w-[60px]">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"><Icons.Plus/></div>
                    <span className="text-xs mt-1 text-gray-400">Add</span>
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-2">📅 Today's Events</h2>
              {getEventsForDate(today()).length === 0 ? <p className="text-gray-400 text-sm">No events today</p> :
                getEventsForDate(today()).map(e => (
                  <div key={e.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-2 h-8 rounded-full bg-indigo-500"/>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800">{e.title}</div>
                      <div className="text-xs text-gray-400">{e.type} {e.restricted && isParent ? '🔒' : ''}</div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold">{family.events.length}</div>
                <div className="text-indigo-200 text-sm">Total Events</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold">{family.activities.filter(a=>a.completed).length}</div>
                <div className="text-pink-200 text-sm">Completed Tasks</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold">{family.members.length}</div>
                <div className="text-emerald-200 text-sm">Family Members</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold">{family.rewards.reduce((s,r)=>s+r.points,0)}</div>
                <div className="text-amber-200 text-sm">Total Stars ⭐</div>
              </div>
            </div>

            {isChild && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4">
                <h3 className="font-bold text-amber-800 mb-1">⭐ My Stars</h3>
                <div className="text-4xl font-bold text-amber-600">{getTotalPoints(currentUser.id)}</div>
                <div className="text-amber-500 text-sm">Keep up the great work!</div>
              </div>
            )}

            {isParent && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icons.Shield/>
                  <h2 className="font-bold text-gray-800">Co-Parenting Access</h2>
                </div>
                <p className="text-sm text-gray-500 mb-3">Share your Family ID <span className="font-mono font-bold text-indigo-600">{family.code}</span> with co-parents to sync data. Children have restricted views — medical and financial events are hidden.</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">✓ Parents see all</span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">🔒 Kids restricted</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CALENDAR */}
        {tab === 'calendar' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <button onClick={()=>setCalendarMonth(new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()-1))} className="p-2 hover:bg-gray-100 rounded-lg text-lg">←</button>
                <h2 className="font-bold text-gray-800">{calendarMonth.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</h2>
                <button onClick={()=>setCalendarMonth(new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+1))} className="p-2 hover:bg-gray-100 rounded-lg text-lg">→</button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['S','M','T','W','T','F','S'].map((d,i)=><div key={i} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800">📋 {fmtDate(selectedDate)}</h3>
                {isParent && <button onClick={()=>{setFormData({date:selectedDate,type:'Other',restricted:false});setModal('addEvent')}} className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"><Icons.Plus/> Add</button>}
              </div>
              {todayEvents.length === 0 ? <p className="text-gray-400 text-sm py-4 text-center">No events on this date</p> :
                todayEvents.map(e => (
                  <div key={e.id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 text-lg flex-shrink-0">
                      {e.type==='Medical'?'🏥':e.type==='Doctor Appointment'?'👨‍⚕️':e.type==='Homework'?'📚':e.type==='School'?'🏫':e.type==='Sports'?'⚽':e.type==='Birthday'?'🎂':'📌'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800">{e.title}</div>
                      <div className="text-xs text-gray-400">{e.type} {e.restricted && isParent ? '🔒 Restricted from kids':''}</div>
                      {e.notes && <div className="text-xs text-gray-500 mt-1">{e.notes}</div>}
                      <div className="text-xs text-indigo-400 mt-1">For: {e.memberId==='all'?'Everyone':family.members.find(m=>m.id===e.memberId)?.name||'Unknown'}</div>
                    </div>
                    {isParent && <button onClick={()=>deleteEvent(e.id)} className="text-red-400 hover:text-red-600 p-1"><Icons.Trash/></button>}
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* ACTIVITIES */}
        {tab === 'activity' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-gray-800 text-lg">📊 Activity Tracker</h2>
              <button onClick={()=>{setFormData({date:today(),category:ACTIVITY_CATS[0],memberId:currentUser.id});setModal('addActivity')}} className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"><Icons.Plus/> Add</button>
            </div>

            {/* Charts */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">By Category</h3>
              <BarChart data={stats.byCategory} colors={COLORS}/>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">Completion</h3>
              <DonutChart data={stats.completion} colors={['#22c55e','#f59e0b']}/>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">By Member</h3>
              <BarChart data={stats.byMember} colors={COLORS}/>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">Weekly Activity</h3>
              <WeeklyChart data={stats.byDay} color="#6366f1"/>
            </div>

            {/* Activity List */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3">Recent Activities</h3>
              {family.activities.length === 0 ? <p className="text-gray-400 text-sm text-center py-4">No activities yet</p> :
                family.activities.slice(-10).reverse().map(a => {
                  const member = family.members.find(m=>m.id===a.memberId);
                  return (
                    <div key={a.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <button onClick={()=>toggleActivity(a.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${a.completed?'bg-green-500 border-green-500 text-white':'border-gray-300'}`}>
                        {a.completed && <Icons.Check/>}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm ${a.completed?'line-through text-gray-400':'text-gray-800'}`}>{a.title}</div>
                        <div className="text-xs text-gray-400">{a.category} • {a.duration}min • {member?.name} • {fmtDate(a.date)}</div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}

        {/* REWARDS */}
        {tab === 'rewards' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-gray-800 text-lg">⭐ Kids Rewards</h2>
              {isParent && <button onClick={()=>{setFormData({memberId:childMembers[0]?.id});setModal('addReward')}} className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"><Icons.Plus/> Award</button>}
            </div>

            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4">
              <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><Icons.Trophy/> Leaderboard</h3>
              {childMembers.length===0 ? <p className="text-amber-600 text-sm">No children in the family yet</p> :
                childMembers.sort((a,b)=>getTotalPoints(b.id)-getTotalPoints(a.id)).map((c,i) => (
                  <div key={c.id} className="flex items-center gap-3 py-2">
                    <span className="text-2xl">{i===0?'🥇':i===1?'🥈':'🥉'}</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{background:c.color}}>{c.name[0]}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{c.name}</div>
                    </div>
                    <div className="text-xl font-bold text-amber-600">{getTotalPoints(c.id)} ⭐</div>
                  </div>
                ))
              }
            </div>

            {/* Reward History */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3">Reward History</h3>
              {family.rewards.length === 0 ? <p className="text-gray-400 text-sm text-center py-4">No rewards yet</p> :
                family.rewards.slice(-15).reverse().map(r => {
                  const member = family.members.find(m=>m.id===r.memberId);
                  const awardedBy = family.members.find(m=>m.id===r.awardedBy);
                  return (
                    <div key={r.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 font-bold">+{r.points}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{r.reason || 'Good job!'}</div>
                        <div className="text-xs text-gray-400">To: {member?.name} • By: {awardedBy?.name} • {fmtDate(r.date)}</div>
                      </div>
                    </div>
                  );
                })
              }
            </div>

            {/* Points by Kid Chart */}
            {childMembers.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-700 mb-2">Points Distribution</h3>
                <DonutChart data={childMembers.map(c=>({label:c.name,value:getTotalPoints(c.id)}))} colors={COLORS}/>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-800 text-lg">⚙️ Settings</h2>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3">Family Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-500">Family Name</span><span className="font-medium">{family.name}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-500">Family ID</span><span className="font-mono font-bold text-indigo-600">{family.code}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-500">Members</span><span className="font-medium">{family.members.length}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3">Members & Access</h3>
              {family.members.map(m => (
                <div key={m.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{background:m.color}}>{m.name[0]}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{m.name}</div>
                    <div className="text-xs text-gray-400 capitalize">{m.role}</div>
                  </div>
                  <div className="flex gap-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${m.role==='parent'?'bg-green-100 text-green-700':'bg-amber-100 text-amber-700'}`}>
                      {m.role==='parent'?'Full Access':'Limited'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📱 Share with Family</h3>
              <p className="text-sm text-blue-700 mb-2">Share this Family ID with other family members:</p>
              <div className="bg-white border-2 border-blue-300 rounded-xl p-3 text-center">
                <span className="text-2xl font-mono font-bold text-indigo-600 tracking-widest">{family.code}</span>
              </div>
              <p className="text-xs text-blue-600 mt-2">All members with this ID can access shared family data. Child accounts will have restricted views automatically.</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">👁️ Access Control</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 py-1"><span className="w-2 h-2 rounded-full bg-green-500"/>Parents see all events, activities & rewards</div>
                <div className="flex items-center gap-2 py-1"><span className="w-2 h-2 rounded-full bg-amber-500"/>Children cannot see restricted (🔒) events</div>
                <div className="flex items-center gap-2 py-1"><span className="w-2 h-2 rounded-full bg-blue-500"/>Medical & financial events auto-restricted</div>
                <div className="flex items-center gap-2 py-1"><span className="w-2 h-2 rounded-full bg-purple-500"/>Co-parents have full access via Family ID</div>
              </div>
            </div>

            {isParent && (
              <button onClick={()=>{setModal('addMemberApp')}} className="w-full bg-indigo-500 text-white rounded-2xl p-4 font-semibold text-center hover:bg-indigo-600 transition-colors">+ Add Family Member</button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center z-40" style={{paddingBottom:'max(8px, env(safe-area-inset-bottom))'}}>
        {[
          {id:'home',icon:<Icons.Home/>,label:'Home'},
          {id:'calendar',icon:<Icons.Calendar/>,label:'Calendar'},
          {id:'activity',icon:<Icons.Activity/>,label:'Activity'},
          ...(!isChild ? [{id:'rewards',icon:<Icons.Trophy/>,label:'Rewards'}] : [{id:'rewards',icon:<Icons.Star/>,label:'My Stars'}]),
          {id:'settings',icon:<Icons.Settings/>,label:'Settings'}
        ].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${tab===t.id?'text-indigo-600':'text-gray-400'}`}>
            <div className={tab===t.id?'text-indigo-600':'text-gray-400'}>{t.icon}</div>
            <span className="text-xs mt-0.5 font-medium">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Add Event Modal */}
      <Modal open={modal==='addEvent'} onClose={()=>setModal(null)} title="Add Event">
        <input value={formData.title||''} onChange={e=>setFormData(f=>({...f,title:e.target.value}))} placeholder="Event Title" className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
        <select value={formData.type||'Other'} onChange={e=>setFormData(f=>({...f,type:e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none">
          {EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
        <input type="date" value={formData.date||today()} onChange={e=>setFormData(f=>({...f,date:e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
        <select value={formData.memberId||'all'} onChange={e=>setFormData(f=>({...f,memberId:e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none">
          <option value="all">Everyone</option>
          {family.members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <textarea value={formData.notes||''} onChange={e=>setFormData(f=>({...f,notes:e.target.value}))} placeholder="Notes..." rows={2} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none resize-none"/>
        <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <input type="checkbox" checked={formData.restricted||false} onChange={e=>setFormData(f=>({...f,restricted:e.target.checked}))} className="w-4 h-4 rounded"/>
          🔒 Restrict from children
        </label>
        <button onClick={addEvent} className="w-full bg-indigo-500 text-white rounded-xl p-3 font-semibold">Add Event</button>
      </Modal>

      {/* Add Activity Modal */}
      <Modal open={modal==='addActivity'} onClose={()=>setModal(null)} title="Add Activity">
        <input value={formData.title||''} onChange={e=>setFormData(f=>({...f,title:e.target.value}))} placeholder="Activity Name" className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
        <select value={formData.category||ACTIVITY_CATS[0]} onChange={e=>setFormData(f=>({...f,category:e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none">
          {ACTIVITY_CATS.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select value={formData.memberId||currentUser?.id} onChange={e=>setFormData(f=>({...f,memberId:e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none">
          {family.members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <input type="number" value={formData.duration||30} onChange={e=>setFormData(f=>({...f,duration:e.target.value}))} placeholder="Duration (min)" className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
        <input type="date" value={formData.date||today()} onChange={e=>setFormData(f=>({...f,date:e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
        <button onClick={addActivity} className="w-full bg-indigo-500 text-white rounded-xl p-3 font-semibold">Add Activity</button>
      </Modal>

      {/* Add Reward Modal */}
      <Modal open={modal==='addReward'} onClose={()=>setModal(null)} title="Award Stars ⭐">
        <select value={formData.memberId||childMembers[0]?.id||''} onChange={e=>setFormData(f=>({...f,memberId:e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none">
          {childMembers.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input value={formData.reason||''} onChange={e=>setFormData(f=>({...f,reason:e.target.value}))} placeholder="Reason (e.g., Cleaned room)" className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
        <div className="flex gap-2 mb-4">
          {[1,2,5,10,20].map(p=>(
            <button key={p} onClick={()=>setFormData(f=>({...f,points:p}))} className={`flex-1 py-2 rounded-xl border-2 font-bold text-sm transition-all ${formData.points===p?'bg-amber-500 text-white border-amber-500':'border-gray-200 text-gray-600 hover:border-amber-300'}`}>
              +{p}⭐
            </button>
          ))}
        </div>
        <button onClick={addReward} className="w-full bg-amber-500 text-white rounded-xl p-3 font-semibold">Award Stars</button>
      </Modal>

      {/* Add Member Modal (in-app) */}
      <Modal open={modal==='addMemberApp'} onClose={()=>setModal(null)} title="Add Family Member">
        <input value={newMemberName} onChange={e=>setNewMemberName(e.target.value)} placeholder="Name" className="w-full border-2 border-gray-200 rounded-xl p-3 mb-3 focus:border-indigo-500 focus:outline-none"/>
        <select value={newMemberRole} onChange={e=>setNewMemberRole(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl p-3 mb-4 focus:border-indigo-500 focus:outline-none">
          <option value="parent">Parent / Adult</option>
          <option value="child">Child</option>
        </select>
        <button onClick={()=>{addMember();}} className="w-full bg-indigo-500 text-white rounded-xl p-3 font-semibold">Add Member</button>
      </Modal>
    </div>
  );
}