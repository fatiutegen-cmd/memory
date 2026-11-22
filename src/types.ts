import type {Spotify} from './spotify';
export type Mood='peaceful'|'energetic'|'nostalgic';
export interface Draft{date:string;text:string;photos:string[];songUrl:string;genre:string;energy:number;songMood:string;spotify?:Spotify}
export interface Memory extends Draft{id:string;mood:Mood;title:string;palette:[string,string,string];keywords:string[]}
