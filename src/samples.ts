import {Memory} from './types';
const enc=(s:string)=>'data:image/svg+xml;utf8,'+encodeURIComponent(s);
export const scene=(a:string,b:string,c:string,sun=.5,seed=0)=>enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="600" height="750" fill="url(#g)"/><circle cx="${150+seed*120}" cy="${150+sun*160}" r="${70+seed*14}" fill="#fff" opacity=".6"/><path d="M0 470 Q150 ${380+seed*30} 300 450 T600 430 V750 H0Z" fill="${c}" opacity=".55"/><path d="M0 560 Q200 ${470-seed*20} 380 560 T600 520 V750 H0Z" fill="${c}" opacity=".85"/></svg>`);
const d=(n:number)=>new Date(Date.now()-n*864e5).toISOString().slice(0,10);
export const SAMPLES:Memory[]=[
{id:'s1',date:d(2),mood:'peaceful',title:'The Quiet of Garden',genre:'Ambient',energy:20,songMood:'Calm',songUrl:'https://open.spotify.com/track/sample',keywords:['garden','morning','tea'],palette:['#DCE6DE','#9DB8A8','#2F3B36'],
text:'A slow Sunday morning. I made tea and sat in the garden while the rain stopped. Nothing to do, nowhere to be. The window was open and the whole house felt like a deep breath.',
photos:[scene('#EAF1EA','#B9CFC0','#6E9482',.3,0),scene('#F2EBDD','#CFDCCB','#7FA08E',.6,1),scene('#E4ECF0','#B8CCD0','#668A8A',.4,2)]},
{id:'s2',date:d(5),mood:'energetic',title:'Electric Festival',genre:'Electronic',energy:92,songMood:'Joyful',songUrl:'https://youtu.be/sample',keywords:['festival','friends','night'],palette:['#E9573F','#F5C84B','#FFF8EC'],
text:'We finally made it to the festival! Friends, loud music, dancing until the lights came up. I ran across the field laughing and the whole night felt wild and fast.',
photos:[scene('#FFB347','#E9573F','#7A1F5C',.2,0),scene('#FF6B9D','#F5C84B','#3B1E6B',.5,1),scene('#5EC8F2','#2F5BEA','#1B1464',.7,2)]},
{id:'s3',date:d(9),mood:'nostalgic',title:'When Grandma Felt Like Home',genre:'Folk',energy:40,songMood:'Wistful',songUrl:'https://soundcloud.com/sample',keywords:['grandma','summer','house'],palette:['#EBDDC3','#C9A06B','#4A3A28'],
text:'Found an old photo of grandma’s house, that summer years ago. I remember the smell of bread and the radio in the kitchen. I miss how simple home used to be.',
photos:[scene('#F3DFB8','#D9B07A','#8A5A34',.4,0),scene('#EBD3C0','#C99A7A','#7A4A38',.6,1)]}];
