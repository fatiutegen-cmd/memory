import {Memory} from './types';import {SAMPLES} from './samples';
const K='memory.v1';
export const load=():Memory[]=>{try{const r=localStorage.getItem(K);if(r)return JSON.parse(r)}catch{}return SAMPLES};
export const save=(m:Memory[])=>{try{localStorage.setItem(K,JSON.stringify(m))}catch{alert('Storage is full — delete an old memory or use fewer photos.')}};
export const toData=(f:File)=>new Promise<string>(res=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const s=Math.min(1,900/Math.max(i.width,i.height));const c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d')!.drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.78))};i.src=r.result as string};r.readAsDataURL(f)});
