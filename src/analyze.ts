import {Draft,Memory,Mood} from './types';
const LEX:Record<Mood,string[]>={
peaceful:['calm','quiet','slow','still','tea','garden','sunday','morning','rain','read','walk','breath','soft','lake','silence','cozy','relax','peace','window','sunrise'],
energetic:['run','party','dance','loud','race','fast','game','crowd','festival','laugh','jump','adventure','excited','concert','gym','friends','city','night','wild','finally'],
nostalgic:['remember','childhood','grandma','grandpa','old','used to','miss','years ago','memories','home','school','vintage','photo','letter','once','back then','summer','family','childhood','again']};
const GENRE:Record<string,Mood>={Ambient:'peaceful',Classical:'peaceful',Jazz:'peaceful','Lo-fi':'peaceful',Folk:'nostalgic',Indie:'nostalgic',Soul:'nostalgic',Pop:'energetic',Rock:'energetic',Electronic:'energetic','Hip-hop':'energetic'};
const SMOOD:Record<string,Mood>={Calm:'peaceful',Dreamy:'peaceful',Joyful:'energetic',Intense:'energetic',Wistful:'nostalgic'};
const PAL:Record<Mood,[string,string,string][]>={
peaceful:[['#DCE6DE','#9DB8A8','#2F3B36'],['#E2E6EE','#A5B4CB','#2F3A48']],
energetic:[['#E9573F','#F5C84B','#FFF8EC'],['#2F5BEA','#FF8FB1','#FFF8EC']],
nostalgic:[['#EBDDC3','#C9A06B','#4A3A28'],['#E8D3CC','#B97D6B','#4A3028']]};
const STOP=new Set('about after again always because before being could every first going great little maybe never really should still their there these thing think those today very what when where which while would yesterday evening'.split(' '));
export function analyze(d:Draft):{mood:Mood;keywords:string[]}{
 const t=d.text.toLowerCase();const s:Record<Mood,number>={peaceful:0,energetic:0,nostalgic:0};
 (Object.keys(LEX) as Mood[]).forEach(m=>LEX[m].forEach(w=>{if(t.includes(w))s[m]+=2}));
 s[GENRE[d.genre]??'peaceful']+=1.5;s[SMOOD[d.songMood]??'peaceful']+=1.5;
 if(d.energy>=70)s.energetic+=2;else if(d.energy<=35)s.peaceful+=2;else s.nostalgic+=.5;
 const mood=(Object.keys(s) as Mood[]).sort((a,b)=>s[b]-s[a])[0];
 const f:Record<string,number>={};t.match(/[a-zа-я']{5,}/g)?.forEach(w=>{if(!STOP.has(w))f[w]=(f[w]||0)+1});
 const keywords=Object.entries(f).sort((a,b)=>b[1]-a[1]||b[0].length-a[0].length).slice(0,5).map(e=>e[0]);
 return{mood,keywords};
}
const cap=(s:string)=>s.charAt(0).toUpperCase()+s.slice(1);
export function makeTitle(mood:Mood,k:string[],id:string){
 const w=cap(k[0]||({peaceful:'stillness',energetic:'today',nostalgic:'yesterday'})[mood]);
 const T:Record<Mood,string[]>={peaceful:[`The Quiet of ${w}`,`A Soft Hour of ${w}`,`Slow Light on ${w}`],
 energetic:[`${w}, Full Volume`,`The Day ${w} Took Off`,`Electric ${w}`],
 nostalgic:[`When ${w} Felt Like Home`,`Letters from ${w}`,`Still Remembering ${w}`]};
 return T[mood][id.charCodeAt(id.length-1)%3];
}
export function buildMemory(d:Draft):Memory{
 const id=Date.now().toString(36)+Math.floor(Math.random()*9);const{mood,keywords}=analyze(d);
 const p=PAL[mood][d.genre.length%2];
 return{...d,id,mood,keywords,title:makeTitle(mood,keywords,id),palette:p};
}
export const GENRES=Object.keys(GENRE);export const SONG_MOODS=Object.keys(SMOOD);
export const platform=(u:string)=>/spotify/.test(u)?'Spotify':/youtu/.test(u)?'YouTube':/apple/.test(u)?'Apple Music':/soundcloud/.test(u)?'SoundCloud':u?'Link':'';
