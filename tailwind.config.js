export default {content:['./index.html','./src/**/*.{ts,tsx}'],theme:{extend:{
colors:{ivory:'#F4F0E8',forest:'#333B38'},
fontFamily:{serif:['Fraunces','Georgia','serif'],sans:['Inter','system-ui','sans-serif'],hand:['Caveat','cursive']},
keyframes:{fadeUp:{'0%':{opacity:0,transform:'translateY(14px)'},'100%':{opacity:1,transform:'none'}},
float:{'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-10px)'}},
eq:{'0%,100%':{transform:'scaleY(.25)'},'50%':{transform:'scaleY(1)'}},
slide:{'0%':{transform:'translateX(0)'},'100%':{transform:'translateX(-50%)'}},
focus:{'0%':{filter:'blur(14px)'},'100%':{filter:'blur(0)'}}},
animation:{fadeUp:'fadeUp .7s ease both',float:'float 7s ease-in-out infinite',slide:'slide 18s linear infinite',focus:'focus 3.5s ease forwards'}}},plugins:[]}
