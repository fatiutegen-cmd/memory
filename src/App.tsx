import {useEffect,useState} from 'react';
import {Draft,Memory} from './types';import {load,save,toData} from './store';
import {buildMemory,GENRES,SONG_MOODS} from './analyze';import MemoryView from './MemoryView';
import SpotifyPicker from './SpotifyPicker';import {scene} from './samples';
type View={n:'home'}|{n:'create'}|{n:'gen';m:Memory}|{n:'view';id:string}|{n:'archive'};
const fmt=(s:string)=>new Date(s).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
const cover=(m:Memory)=>m.photos[0]||scene(...m.palette);
function Card({m,open,big}:{m:Memory;open:()=>void;big?:boolean}){
 return <button onClick={open} className={`text-left shrink-0 ${big?'w-44':'w-full'} animate-fadeUp`}>
 <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/5]"><img src={cover(m)} className="w-full h-full object-cover" style={{filter:m.mood==='nostalgic'?'sepia(.5)':''}}/>
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/><span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-white/80 rounded-full px-2 py-1">{m.mood}</span>
 <p className="absolute bottom-3 left-3 right-3 text-white font-serif text-lg leading-tight">{m.title}</p></div>
 <p className="text-xs opacity-60 mt-2 px-1">{fmt(m.date)}</p></button>;
}
function Nav({v,go}:{v:string;go:(x:View)=>void}){
 const I=(k:'home'|'create'|'archive',l:string)=><button onClick={()=>go({n:k})} className={`flex-1 py-3 text-xs tracking-wide ${v===k?'font-semibold':'opacity-50'}`}>{l}</button>;
 return <nav className="fixed bottom-0 inset-x-0 z-30 bg-ivory/90 backdrop-blur border-t border-forest/10 pb-[env(safe-area-inset-bottom)]"><div className="max-w-md mx-auto flex">{I('home','Home')}{I('create','＋ Create')}{I('archive','Archive')}</div></nav>;
}
function Create({onSubmit}:{onSubmit:(d:Draft)=>void}){
 const [d,setD]=useState<Draft>({date:new Date().toISOString().slice(0,10),text:'',photos:[],songUrl:'',genre:'Indie',energy:50,songMood:'Dreamy'});
 const set=(p:Partial<Draft>)=>setD(x=>({...x,...p}));const ok=d.text.trim().length>=10||d.photos.length>0;
 const chip=(a:boolean)=>`px-3 py-1.5 rounded-full text-xs border ${a?'bg-forest text-ivory border-forest':'border-forest/25'}`;
 return <div className="px-6 pt-14 pb-32 space-y-7 animate-fadeUp">
 <div><h1 className="font-serif text-4xl">Create memory</h1><p className="text-sm opacity-60 mt-1">Tell us about your day.</p></div>
 <input type="date" value={d.date} onChange={e=>set({date:e.target.value})} className="w-full bg-white/60 rounded-2xl p-3 text-sm"/>
 <textarea value={d.text} onChange={e=>set({text:e.target.value})} rows={6} placeholder="What happened today? How did it feel?" className="w-full bg-white/60 rounded-3xl p-4 font-serif text-lg shadow-sm outline-none"/>
 <div><p className="text-xs uppercase tracking-widest opacity-60 mb-3">Photographs</p>
 <div className="grid grid-cols-3 gap-3">{d.photos.map((p,i)=><div key={i} className="relative aspect-square"><img src={p} className="w-full h-full object-cover rounded-2xl shadow"/><button onClick={()=>set({photos:d.photos.filter((_,j)=>j!==i)})} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-forest text-ivory text-xs">×</button></div>)}
 <label className="aspect-square rounded-2xl border-2 border-dashed border-forest/30 grid place-items-center text-3xl cursor-pointer">+<input type="file" accept="image/*" multiple hidden onChange={async e=>{const f=Array.from(e.target.files||[]);const r=await Promise.all(f.map(toData));set({photos:[...d.photos,...r]});e.target.value=''}}/></label></div></div>
 <div className="space-y-4"><p className="text-xs uppercase tracking-widest opacity-60">Soundtrack</p>
 <SpotifyPicker value={d.spotify} onChange={s=>set({spotify:s,songUrl:s?.url||''})}/>
 <div className="flex flex-wrap gap-2">{GENRES.map(g=><button key={g} onClick={()=>set({genre:g})} className={chip(d.genre===g)}>{g}</button>)}</div>
 <div className="flex flex-wrap gap-2">{SONG_MOODS.map(g=><button key={g} onClick={()=>set({songMood:g})} className={chip(d.songMood===g)}>{g}</button>)}</div>
 <div><div className="flex justify-between text-xs opacity-70"><span>Energy</span><span>{d.energy}%</span></div><input type="range" min={0} max={100} value={d.energy} onChange={e=>set({energy:+e.target.value})} className="w-full"/></div></div>
 <button disabled={!ok} onClick={()=>onSubmit(d)} className="w-full py-4 rounded-full bg-forest text-ivory shadow-xl disabled:opacity-30">Generate memory</button></div>;
}
function Generating({m,done}:{m:Memory;done:()=>void}){
 const steps=['Reading your story…',`Sensing the atmosphere: ${m.mood}`,`Listening to the ${m.genre.toLowerCase()} · ${m.songMood.toLowerCase()} · ${m.energy}% energy`,'Developing your photographs…','Choosing a title…','Composing your memory'];
 const [i,setI]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setI(x=>x+1),900);return()=>clearInterval(t)},[]);
 useEffect(()=>{if(i>=steps.length)done()},[i]);
 return <div className="min-h-screen grid place-items-center px-8 text-center" style={{background:`linear-gradient(160deg,${m.palette[0]},#F4F0E8)`}}>
 <div className="w-full max-w-xs"><div className="relative h-56 mb-10">{(m.photos.length?m.photos:[cover(m)]).slice(0,3).map((p,k)=><img key={k} src={p} style={{transform:`rotate(${(k-1)*9}deg) translateX(${(k-1)*26}px)`}} className="absolute inset-x-8 h-56 w-40 mx-auto object-cover rounded-2xl shadow-2xl animate-focus"/>)}</div>
 <p key={i} className="font-serif text-xl min-h-[4rem] animate-fadeUp">{steps[Math.min(i,steps.length-1)]}</p>
 <div className="h-1 bg-forest/15 rounded mt-6 overflow-hidden"><div className="h-full bg-forest transition-all duration-700" style={{width:`${Math.min(100,(i+1)/steps.length*100)}%`}}/></div></div></div>;
}
export default function App(){
 const [mem,setMem]=useState<Memory[]>(load);const [v,setV]=useState<View>({n:'home'});
 const [q,setQ]=useState('');const [f,setF]=useState('all');
 useEffect(()=>{save(mem)},[mem]);useEffect(()=>{window.scrollTo(0,0)},[v.n]);
 const sorted=[...mem].sort((a,b)=>b.date.localeCompare(a.date));const open=(id:string)=>setV({n:'view',id});
 if(v.n==='gen')return <Generating m={v.m} done={()=>{setMem(x=>[v.m,...x]);open(v.m.id)}}/>;
 if(v.n==='view'){const m=mem.find(x=>x.id===v.id);if(m)return <MemoryView m={m} onBack={()=>setV({n:'archive'})} onDelete={()=>{setMem(x=>x.filter(y=>y.id!==m.id));setV({n:'archive'})}}/>}
 const h=new Date().getHours();const hi=h<12?'Good morning':h<18?'Good afternoon':'Good evening';
 const list=sorted.filter(m=>(f==='all'||m.mood===f)&&(m.title+m.text).toLowerCase().includes(q.toLowerCase()));
 return <div className="max-w-md mx-auto min-h-screen">
 {v.n==='create'&&<Create onSubmit={d=>setV({n:'gen',m:buildMemory(d)})}/>}
 {v.n==='home'&&<div className="pt-16 pb-32 animate-fadeUp"><div className="px-6"><p className="text-[11px] tracking-[.3em] uppercase opacity-50">MEMORY</p>
  <h1 className="font-serif text-5xl leading-[1.05] mt-4">{hi}.<br/><i className="font-normal opacity-70">What will you remember today?</i></h1>
  <button onClick={()=>setV({n:'create'})} className="mt-8 w-full py-4 rounded-full bg-forest text-ivory shadow-xl">Create memory</button></div>
  <div className="flex justify-between items-end px-6 mt-12 mb-4"><h2 className="font-serif text-2xl">Recent</h2><button onClick={()=>setV({n:'archive'})} className="text-xs underline">See all</button></div>
  {sorted.length?<div className="flex gap-4 overflow-x-auto px-6 pb-4">{sorted.slice(0,6).map(m=><Card big key={m.id} m={m} open={()=>open(m.id)}/>)}</div>:<p className="px-6 text-sm opacity-60">No memories yet.</p>}</div>}
 {v.n==='archive'&&<div className="px-6 pt-14 pb-32 animate-fadeUp"><h1 className="font-serif text-4xl">Archive</h1><p className="text-sm opacity-60 mt-1">{mem.length} memories</p>
  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="w-full bg-white/60 rounded-full px-4 py-3 text-sm mt-5 outline-none"/>
  <div className="flex gap-2 mt-4">{['all','peaceful','energetic','nostalgic'].map(k=><button key={k} onClick={()=>setF(k)} className={`px-3 py-1.5 rounded-full text-xs border ${f===k?'bg-forest text-ivory border-forest':'border-forest/25'}`}>{k}</button>)}</div>
  <div className="grid grid-cols-2 gap-4 mt-6">{list.map(m=><Card key={m.id} m={m} open={()=>open(m.id)}/>)}</div>
  {!list.length&&<p className="text-center opacity-50 mt-16 text-sm">Nothing found.</p>}</div>}
 <Nav v={v.n} go={setV}/></div>;
}
