/* FlipForge — Standalone Flipbook Viewer */
var CFG = {
 "title": "ราชสีห์กับหนู เจ้าป่าใหญ่กับเพื่อนตัวเล็ก",
 "pages": [
  "page-001.jpg",
  "page-002.jpg",
  "page-003.jpg",
  "page-004.jpg",
  "page-005.jpg",
  "page-006.jpg",
  "page-007.jpg",
  "page-008.jpg",
  "page-009.jpg"
 ],
 "ratio": 1.4151,
 "display": "single",
 "hard": true,
 "sound": true,
 "volume": 1,
 "duration": 1700,
 "customAudio": "assets/audio/soumages-book-opening-345808.mp3",
 "defaultAudio": "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
 "bg": "slate"
};

/* ── PAPER SOUND ENGINE (HTML5 Audio) ── */
var Paper=(function(){var on=CFG.sound, vol=CFG.volume, audio;
 function play(){if(!on)return;
  if(!audio) audio=document.getElementById("paperSound");
  if(!audio) return;
  var c=audio.cloneNode();c.volume=vol;
  c.play().catch(function(e){console.log("Audio block",e);});}
 function toggle(){on=!on;return on;}
 function init(){}
 return{play:play,toggle:toggle,init:init};})();

function calcSize(){var th=document.getElementById("thumbs").classList.contains("on")?244:158;
 var availH=window.innerHeight-58-th,availW=window.innerWidth-70;
 var dbl=CFG.display==="double"&&window.innerWidth>760;
 var h=Math.min(availH,820),pw=h/CFG.ratio,bw=dbl?pw*2:pw;
 if(bw>availW){bw=availW;pw=dbl?bw/2:bw;h=pw*CFG.ratio;}
 return{w:Math.floor(bw),h:Math.floor(h),dbl:dbl};}

$(function(){
 var $fb=$("#flipbook"),total=CFG.pages.length,loaded=0,zoomed=false,cur=1;
 CFG.pages.forEach(function(nm,i){
  var hard=CFG.hard&&(i===0||i===total-1);
  var img=new Image();img.src="pages/"+nm;img.alt="Page "+(i+1);
  img.onload=img.onerror=function(){if(++loaded===total)boot();};
  $fb.append($("<div>").addClass("page"+(hard?" hard":"")).append(img));
  var t=$("<div class=\"th\"><img src=\"pages/"+nm+"\"><b>"+(i+1)+"</b></div>");
  t.on("click",function(){$fb.turn("page",i+1);});$("#thumbs").append(t);});

 function boot(){var s=calcSize();
  $fb.turn({width:s.w,height:s.h,display:s.dbl?"double":"single",autoCenter:true,
   acceleration:true,elevation:70,gradients:true,duration:CFG.duration,
   when:{turning:function(e,p){Paper.play();},
         turned:function(e,p){cur=p;sync(p);}}});
  var h=(location.hash.match(/page=(\d+)/)||[])[1];
  if(h){var n=Math.max(1,Math.min(total,+h));if(n>1)setTimeout(function(){$fb.turn("page",n);},400);}
  $("#ld").addClass("hide");}

 function sync(p){$("#pNow").text(p);$("#pRange").val(p);
  $(".th").removeClass("sel").eq(p-1).addClass("sel");
  if(history.replaceState)history.replaceState(null,"","#page="+p);
  var sel=document.querySelector(".th.sel");
  if(sel&&document.getElementById("thumbs").classList.contains("on"))
   sel.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});}

 $("#bPrev").on("click",function(){$fb.turn("previous");});
 $("#bNext").on("click",function(){$fb.turn("next");});
 $("#bFirst").on("click",function(){$fb.turn("page",1);});
 $("#bLast").on("click",function(){$fb.turn("page",total);});
 $("#pRange").on("input",function(){$fb.turn("page",+this.value);});
 $("#bSound").on("click",function(){$(this).toggleClass("off",!Paper.toggle());});
 $("#bZoom").on("click",function(){zoomed=!zoomed;
  $(".shell").css("transform",zoomed?"scale(1.28)":"scale(1)");});
 $("#bThumb").on("click",function(){$("#thumbs").toggleClass("on");
  var s=calcSize();try{$fb.turn("size",s.w,s.h);}catch(e){}});
 $("#bFs").on("click",function(){document.fullscreenElement?document.exitFullscreen()
  :document.documentElement.requestFullscreen();});
 $(document).on("keydown",function(e){
  if(e.key==="ArrowLeft")$fb.turn("previous");
  if(e.key==="ArrowRight")$fb.turn("next");
  if(e.key==="Escape")$("#mask").removeClass("on");});
 $(window).on("resize",function(){var s=calcSize();try{$fb.turn("size",s.w,s.h);}catch(e){}});

 /* ── SHARE ── */
 $("#bShare").on("click",function(){
  var base=location.origin+location.pathname,url=base+"#page="+cur;
  $("#sLink").val(url);
  $("#sQr").attr("src","https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data="+encodeURIComponent(url));
  $("#sEmbed").val('<iframe src="'+base+'" width="100%" height="620" frameborder="0" allowfullscreen style="border:0;border-radius:14px"></iframe>');
  var e=encodeURIComponent(url),t=encodeURIComponent(CFG.title);
  $("#socs").html('<a class="fb" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u='+e+'">Facebook</a>'+
   '<a class="xx" target="_blank" href="https://twitter.com/intent/tweet?url='+e+'&text='+t+'">X</a>'+
   '<a class="ln" target="_blank" href="https://social-plugins.line.me/lineit/share?url='+e+'">LINE</a>'+
   '<a class="wa" target="_blank" href="https://wa.me/?text='+t+'%20'+e+'">WhatsApp</a>'+
   '<a class="ml" href="mailto:?subject='+t+'&body='+e+'">Email</a>');
  $("#mask").addClass("on");
  if(navigator.share&&window.innerWidth<760){navigator.share({title:CFG.title,url:url}).catch(function(){});}});
 $("#mClose").on("click",function(){$("#mask").removeClass("on");});
 $("#mask").on("click",function(e){if(e.target.id==="mask")$("#mask").removeClass("on");});
 $("#sCopy").on("click",function(){copy("#sLink",this);});
 $("#sCopyEmbed").on("click",function(){copy("#sEmbed",this);});
 function copy(sel,btn){var el=$(sel)[0];el.select();
  navigator.clipboard.writeText(el.value).then(function(){
   var o=btn.textContent;btn.textContent="คัดลอกแล้ว ✓";
   setTimeout(function(){btn.textContent=o;},1600);});}
});