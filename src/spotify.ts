export interface Spotify{url:string;embed:string;kind:string;title:string;thumb:string}
export function parseSpotify(raw:string):Omit<Spotify,'title'|'thumb'>|null{
 const s=raw.trim();
 const m=s.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(track|album|playlist|episode|show)\/([A-Za-z0-9]+)/)||s.match(/^spotify:(track|album|playlist|episode|show):([A-Za-z0-9]+)/);
 if(!m)return null;
 return{url:`https://open.spotify.com/${m[1]}/${m[2]}`,embed:`https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator`,kind:m[1]};
}
// Публичный oEmbed Spotify: без ключей и без Premium. Если недоступен — плеер всё равно работает.
export async function fetchMeta(url:string){
 try{const r=await fetch('https://open.spotify.com/oembed?url='+encodeURIComponent(url));if(!r.ok)throw 0;
 const j=await r.json();return{title:String(j.title||'Spotify'),thumb:String(j.thumbnail_url||'')}}
 catch{return{title:'Spotify',thumb:''}}
}
