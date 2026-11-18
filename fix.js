(function(){
function toast(t){var d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.remove()},3200);}
function pin(){try{return JSON.parse(localStorage.getItem('atd-pin')||'null')}catch(e){return null}}
function go(){var b=document.getElementById('h-new');if(!b)return setTimeout(go,300);
var nb=b.cloneNode(true);b.parentNode.replaceChild(nb,b);
var box=document.createElement('div');box.className='card';box.hidden=true;box.style.marginTop='10px';
box.innerHTML='<p style="margin:0 0 10px;font-weight:600;line-height:1.7">ستُمسح كل النجوم والخيوط والاكتشافات، ويبدأ المتدربون من الخطوة الأولى. متأكد؟</p><div class="hrow"><button class="btn gold" type="button" id="h-new-y">نعم، ابدأ جلسة جديدة</button><button class="btn" type="button" id="h-new-n">إلغاء</button></div>';
nb.parentNode.parentNode.insertBefore(box,nb.parentNode.nextSibling);
nb.onclick=function(){box.hidden=false;box.scrollIntoView({behavior:'smooth',block:'center'});};
box.querySelector('#h-new-n').onclick=function(){box.hidden=true;};
box.querySelector('#h-new-y').onclick=function(){var y=this;y.disabled=true;y.textContent='جارٍ المسح…';
 fetch(SB_CFG.url+'/rest/v1/rpc/atd_admin',{method:'POST',headers:{apikey:SB_CFG.key,Authorization:'Bearer '+SB_CFG.key,'Content-Type':'application/json'},body:JSON.stringify({p_pin:String(pin()||''),p_action:'new',p_arg:{}})})
 .then(function(r){if(!r.ok)return r.json().then(function(j){throw new Error(j.message||'تعذّر المسح')});box.hidden=true;toast('بدأت جلسة جديدة. السماء فاضية الآن.');})
 .catch(function(e){toast(e.message||'تعذّر المسح');})
 .then(function(){y.disabled=false;y.textContent='نعم، ابدأ جلسة جديدة';});};}
go();})();
