const firstById=Object.fromEntries(firstForms.map(f=>[f[0],f]));
function option(value,label){const o=document.createElement('option');o.value=value;const labels={name:'ชื่อเล่น · tɕʰɯ̂ː-lên',kin:'คำเรียกญาติ',role:'ตำแหน่ง',title:'ตำแหน่ง',zero:'ละสรรพนาม',royal:'คำเรียกตามพระอิสริยยศ'};o.textContent=labels[value]||label.replace(/nickname|name/g,'ชื่อเล่น');return o;}
function initialize(){let group;let label='';for(const f of firstForms){if(f[3]!==label){group=document.createElement('optgroup');group.label=({'Everyday':'ทั่วไป','Names and roles':'ชื่อและบทบาท','Regional / marked':'ภูมิภาค / เฉพาะกลุ่ม','Formal / specialized':'ทางการ / เฉพาะบริบท'})[f[3]];$('first').append(group);label=f[3];}group.append(option(f[0],f[1]+(f[2]?' · '+f[2]:'')));}const q=new URLSearchParams(location.search);$('first').value=firstById[q.get('i')]?q.get('i'):'chan';populate(q.get('you'));tab(q.get('view')==='third');}
function populate(preferred){const f=firstById[$('first').value];const old=preferred||$('second').value;$('second').replaceChildren();for(const key of f[5]){const s=secondForms[key];$('second').append(option(key,s[0]+(s[1]?' · '+s[1]:'')));}$('second').value=f[5].includes(old)?old:f[5][0];render();}
function render(){const f=firstById[$('first').value],key=$('second').value,s=secondForms[key];$('tag').textContent=f[3];$('pair').textContent=f[1]+' → '+s[0];$('heading').textContent='Base use';$('meaning').textContent=pairBases[f[0]][key];$('firstNote').textContent=f[4];$('firstHint').textContent=f[3];$('shift').textContent=specialShifts[f[0]+':'+key]||firstShifts[f[0]]||s[3];
let context='';
if(f[0]==='ai')context='The same speaker may use other pairs with different people; ไอ–ยู does not replace Thai pronouns in every setting.';
if(f[0]==='nuu'&&key==='khun')context='Bare คุณ is possible but may sound less personal than an appropriate name, kinship term, or title.';
if(key==='thoe')context='Second-person เธอ can address different genders. Its third-person use is more restricted.';
$('context').textContent=context;$('context').parentElement.hidden=!context;
const names={name:'เมย์',parent:'แม่',kin:'ป้า',role:'ครู'};let a=names[f[0]]||f[1].split(' / ')[0];let b={name:'เมย์',phii:'พี่',nong:'น้อง',title:'อาจารย์',kin:'แม่',child:'ลูก'}[key]||s[0].split(' / ')[0];
if(f[0]==='name'&&key==='name')a='พลอย';
let thai=(f[0]==='zero'?'':a)+'อยากคุย'+(key==='zero'?'ด้วย':'กับ'+b);let english='I want to talk with you.';
if(f[3]==='Formal / specialized'||f[0]==='kin'||(f[0]==='role'&&['khun','title'].includes(key))){thai='';english='No generic sentence supplied: choose wording for the specific role and setting.';}
if(f[0]==='ai'){thai='ไออยากคุยกับยู';}if(f[0]==='role'&&key==='nuu')thai='ครูอยากคุยกับหนู';
$('thai').textContent=thai;$('thai').hidden=!thai;$('english').textContent=english;
const u=new URL(location.href);u.searchParams.set('i',f[0]);u.searchParams.set('you',key);try{history.replaceState(null,'',u);}catch{}
}
