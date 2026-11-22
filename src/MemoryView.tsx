import {Memory} from './types';import {scene} from './samples';import {SpotifyPlayer} from './SpotifyPicker';import {platform} from './analyze';
const fmt=(s:string)=>new Date(s).toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
function Song({m,ink}:{m:Memory;ink:string}){
 if(!m.songUrl&&m.genre==='')return null;const dur=(1.6-m.energy/100*1.2).toFixed(2);
 const chip=<a href={m.songUrl||undefined} target="_blank" rel="noreferrer" style={{borderColor:ink+'55',color:ink}} className="inline-flex items-center gap-3 border rounded-full px-4 py-2 text-xs backdrop-blur bg-white/20">
 <span className="flex items-end gap-[2px] h-4">{[0,1,2,3].map(i=><i key={i} style={{background:ink,animation:`eq ${dur}s ease-in-out ${i*.15}s infinite`}} className="block w-[3px] h-full origin-bottom rounded"/>)}</span>
 {m.genre} · {m.songMood} · {m.energy}%{platform(m.songUrl)&&<b className="font-medium">· {platform(m.songUrl)} ↗</b>}</a>;
 return <div>{chip}{m.spotify&&<SpotifyPlayer s={m.spotify}/>}</div>;
}
export default function MemoryView({m,onBack,onDelete}:{m:Memory;onBack:()=>void;onDelete:()=>void}){
 const [bg,ac,ink]=m.palette;const ph=m.photos.length?m.photos:[scene(bg,ac,ink)];
 let body;
 if(m.mood==='peaceful')body=(<div className="px-7 pt-24 pb-32 text-center">
  <p className="text-[11px] tracking-[.25em] uppercase opacity-60">{fmt(m.date)}</p>
  <h1 className="font-serif text-[40px] leading-[1.05] mt-4 animate-fadeUp">{m.title}</h1>
  <img src={ph[0]} className="mx-auto mt-9 w-64 h-80 object-cover rounded-t-full rounded-b-[2rem] shadow-2xl animate-float"/>
  <div className="flex justify-center -mt-8 relative">{ph.slice(1,4).map((p,i)=><img key={i} src={p} style={{animationDelay:i+'s'}} className="w-24 h-24 rounded-full object-cover border-4 shadow-xl animate-float -mx-2" />)}</div>
  <p className="font-serif italic text-xl leading-relaxed mt-10">{m.text}</p><div className="mt-8"><Song m={m} ink={ink}/></div></div>);
 else if(m.mood==='energetic')body=(<div className="px-5 pt-24 pb-32">
  <p className="text-xs font-semibold tracking-widest uppercase">{fmt(m.date)}</p>
  <h1 className="font-serif font-black uppercase text-[52px] leading-[.9] mt-3 -rotate-1">{m.title}</h1>
  <div className="-mx-5 my-6 py-2 overflow-hidden whitespace-nowrap font-black uppercase text-sm" style={{background:ac,color:'#1b1b1b'}}>
   <div className="inline-block animate-slide">{Array(8).fill(m.keywords.join(' ✦ ')||m.genre).map((k,i)=><span key={i} className="mx-4">{k} ✦</span>)}</div></div>
  <div className="grid grid-cols-2 gap-5">{ph.map((p,i)=><img key={i} src={p} style={{boxShadow:`7px 7px 0 ${ac}`,transform:`rotate(${[-3,2.5,-2,3][i%4]}deg)`}} className={`rounded-2xl object-cover w-full ${i%3==0?'col-span-2 h-60':'h-44'}`}/>)}</div>
  <p className="font-semibold text-lg leading-snug mt-9">{m.text}</p><div className="mt-6"><Song m={m} ink={ink}/></div></div>);
 else body=(<div className="px-6 pt-24 pb-32 relative">
  <p className="font-hand text-2xl opacity-80">{fmt(m.date)}</p>
  <h1 className="font-serif italic text-4xl leading-tight mt-1">{m.title}</h1>
  <div className="mt-8 space-y-8">{ph.map((p,i)=><div key={i} style={{transform:`rotate(${[-3,2,-1.5,3][i%4]}deg)`,marginLeft:i%2?'auto':0}} className="relative bg-[#fffdf6] p-3 pb-12 w-[78%] shadow-xl">
   <i className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rotate-2 opacity-70" style={{background:ac}}/>
   <img src={p} className="w-full aspect-[4/5] object-cover sepia-[.55] contrast-95"/><span className="absolute bottom-3 left-4 font-hand text-xl">{m.keywords[i]||'remember'}</span></div>)}</div>
  <p className="font-hand text-[26px] leading-snug mt-10">{m.text}</p><div className="mt-8"><Song m={m} ink={ink}/></div></div>);
 return <div className="min-h-screen relative overflow-hidden animate-fadeUp" style={{background:m.mood==='peaceful'?`linear-gradient(180deg,${bg},#F4F0E8 120%)`:bg,color:ink}}>
  {m.mood==='nostalgic'&&<div className="grain"/>}
  <div className="fixed top-0 inset-x-0 z-20 flex justify-between p-4 pt-6 max-w-md mx-auto">
   <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/50 backdrop-blur shadow">←</button>
   <button onClick={()=>confirm('Delete this memory?')&&onDelete()} className="px-4 h-10 rounded-full bg-white/50 backdrop-blur shadow text-xs">Delete</button></div>
  <div className="max-w-md mx-auto relative">{body}</div></div>;
}
