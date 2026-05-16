const gradeMap = { 'A+':10, 'A':9, 'B+':8, 'B':7, 'C+':6 ,'C':5, 'D':4, 'F':0 };


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
  const c = document.querySelectorAll('.credit');
  const g = document.querySelectorAll('.grade');
  
  // Validate inputs
  if (c.length === 0) {
    alert('Please add at least one subject');
    return;
  }
  
  let tc = 0, tp = 0;
  for(let i = 0; i < c.length; i++){
    const credits = parseFloat(c[i].value);
    if (isNaN(credits) || credits <= 0) {
      alert('Invalid credits in subject ' + (i+1));
      return;
    }
    tc += credits;
    tp += credits * gradeMap[g[i].value];
  }
  
  if (tc === 0) {
    alert('Total credits cannot be zero');
    return;
  }
  
  document.getElementById('sgpaResult').innerText = 'SGPA: ' + (tp/tc).toFixed(2);
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
  const s = document.querySelectorAll('.sem');
  const c = document.querySelectorAll('.semc');
  
  if (s.length === 0) {
    alert('Please add at least one semester');
    return;
  }
  
  let tc = 0, tp = 0;
  for(let i = 0; i < s.length; i++){
    const credits = parseFloat(c[i].value);
    const sgpa = parseFloat(s[i].value);
    if (isNaN(credits) || credits <= 0) {
      alert('Invalid credits in semester ' + (i+1));
      return;
    }
    if (isNaN(sgpa)) {
      alert('Invalid SGPA in semester ' + (i+1));
      return;
    }
    tc += credits;
    tp += sgpa * credits;
  }
  
  if (tc === 0) {
    alert('Total credits cannot be zero');
    return;
  }
  
  document.getElementById('cgpaResult').innerText = 'CGPA: ' + (tp/tc).toFixed(2);
}
