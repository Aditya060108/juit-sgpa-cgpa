const gradeMap = { 'A+':10, 'A':9, 'B+':8, 'B':7, 'C':6, 'D':5, 'F':0 };


function hideAll(){ ['home','sgpa','cgpa'].forEach(id=>document.getElementById(id).style.display='none'); }


function login(){
fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({roll:document.getElementById('roll').value})})
.then(()=>alert('Login Successful'));
}


function openSGPA(){ hideAll(); document.getElementById('sgpa').style.display='block'; }
function openCGPA(){ hideAll(); document.getElementById('cgpa').style.display='block'; }


function generateSGPA(){
const n=document.getElementById('sgpaSubjects').value;
const f=document.getElementById('sgpaForm'); f.innerHTML='';
for(let i=1;i<=n;i++){
f.innerHTML+=`<div class="panel">Subject Name:<input class="sub"> Credits:<input class="credit"> Grade:<select class="grade"><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option><option>D</option><option>F</option></select></div>`;
}
f.innerHTML+='<button type="button" onclick="calcSGPA()">Calculate SGPA</button>';
}


function calcSGPA(){
const c=document.querySelectorAll('.credit');
const g=document.querySelectorAll('.grade');
let tc=0,tp=0;
for(let i=0;i<c.length;i++){ tc+=+c[i].value; tp+=c[i].value*gradeMap[g[i].value]; }
document.getElementById('sgpaResult').innerText='SGPA: '+(tp/tc).toFixed(2);
}


function generateCGPA(){
const n=document.getElementById('totalSems').value;
const f=document.getElementById('cgpaForm'); f.innerHTML='';
for(let i=1;i<=n;i++){
f.innerHTML+=`<div class="panel">Semester ${i} SGPA:<input class="sem"> Credits:<input class="semc"></div>`;
}
f.innerHTML+='<button type="button" onclick="calcCGPA()">Calculate CGPA</button>';
}


function calcCGPA(){
const s=document.querySelectorAll('.sem');
const c=document.querySelectorAll('.semc');
let tc=0,tp=0;
for(let i=0;i<s.length;i++){ tc+=+c[i].value; tp+=s[i].value*c[i].value; }
document.getElementById('cgpaResult').innerText='CGPA: '+(tp/tc).toFixed(2);
}