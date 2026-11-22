import {useState} from 'react';
import {Spotify,parseSpotify,fetchMeta} from './spotify';
export function SpotifyPlayer({s}:{s:Spotify}){
 const h=s.kind==='track'||s.kind==='episode'?152:352;
 return <div className="mt-4 rounded-3xl overflow-hidden shadow-xl bg-black/5">
 <iframe title="Spotify" src={s.embed} width="100%" height={h} style={{border:0,display:'block'}} loading="lazy"
 allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"/></div>;
}
export default function SpotifyPicker({value,onChange}:{value?:Spotify;onChange:(s?:Spotify)=>void}){
 const [t,setT]=useState('');const [busy,setBusy]=useState(false);const [err,setErr]=useState('');
 const add=async(raw:string)=>{setT(raw);setErr('');if(!raw.trim())return;
  const p=parseSpotify(raw);if(!p){setErr('Нужна ссылка вида open.spotify.com/track/… (короткие spotify.link не поддерживаются)');return}
  setBusy(true);const meta=await fetchMeta(p.url);setBusy(false);setT('');onChange({...p,...meta})};
 if(value)return <div className="bg-white/60 rounded-3xl p-3 shadow-sm animate-fadeUp">
  <div className="flex items-center gap-3">
   {value.thumb?<img src={value.thumb} className="w-14 h-14 rounded-2xl object-cover shadow"/>:<div className="w-14 h-14 rounded-2xl bg-forest/10 grid place-items-center">♪</div>}
   <div className="flex-1 min-w-0"><p className="text-[10px] uppercase tracking-widest opacity-50">Spotify</p><p className="font-serif text-lg leading-tight truncate">{value.title}</p></div></div>
  <SpotifyPlayer s={value}/>
  <p className="text-[11px] opacity-50 mt-2 px-1">Без входа в Spotify плеер играет 30-секундный фрагмент. Полные треки доступны, если вы вошли в Spotify в этом браузере.</p>
  <div className="flex gap-2 mt-3"><button onClick={()=>onChange(undefined)} className="flex-1 py-2 rounded-full border border-forest/25 text-xs">Заменить</button>
  <button onClick={()=>onChange(undefined)} className="flex-1 py-2 rounded-full border border-forest/25 text-xs">Удалить</button></div></div>;
 return <div><input value={t} onChange={e=>add(e.target.value)} placeholder="Вставьте ссылку на песню из Spotify" className="w-full bg-white/60 rounded-2xl p-3 text-sm outline-none"/>
  {busy&&<p className="text-xs opacity-60 mt-2">Загружаем песню…</p>}{err&&<p className="text-xs text-red-700 mt-2">{err}</p>}</div>;
}
